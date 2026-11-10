import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

function norm(s: string) {
  return String(s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

interface LineItem {
  str: string;
  x: number;
  y: number;
  width: number;
}

function pushLine(items: LineItem[], lines: { page: number; text: string }[], page: number) {
  if (!items.length) return;
  items.sort((a, b) => a.x - b.x);
  let text = '';
  let lastRight: number | null = null;
  for (const it of items) {
    const w = it.width || it.str.length * 4.5;
    if (lastRight !== null && it.x - lastRight > 4) text += ' ';
    text += it.str;
    lastRight = it.x + w;
  }
  text = norm(text);
  if (text) lines.push({ page, text });
}

export interface ExtractedPdf {
  lines: string[];
  raw: string;
  pageCount: number;
}

export async function extractPdfText(file: File): Promise<ExtractedPdf> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const lines: { page: number; text: string }[] = [];
  const rawParts: string[] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent({ includeMarkedContent: false });

    for (const it of content.items) {
      if ('str' in it) {
        const t = norm(it.str);
        if (t) rawParts.push(t);
      }
    }

    const items: LineItem[] = content.items
      .filter((it): it is pdfjsLib.TextItem => 'str' in it)
      .map(it => ({
        str: it.str,
        x: it.transform[4],
        y: Math.round(it.transform[5]),
        width: it.width || 0,
      }))
      .filter(it => norm(it.str));

    items.sort((a, b) => b.y - a.y || a.x - b.x);

    let group: LineItem[] = [];
    let y: number | null = null;

    for (const it of items) {
      if (y === null || Math.abs(it.y - y) <= 3) {
        group.push(it);
        y = y === null ? it.y : Math.round((y + it.y) / 2);
      } else {
        pushLine(group, lines, p);
        group = [it];
        y = it.y;
      }
    }
    pushLine(group, lines, p);
  }

  return {
    lines: lines.map(l => l.text),
    raw: rawParts.join(' '),
    pageCount: pdf.numPages,
  };
}

export async function extractFullText(file: File): Promise<string> {
  const { lines } = await extractPdfText(file);
  return lines.join('\n');
}
