import * as XLSX from 'xlsx';
import type { ExtractedPdf } from './pdfExtractor';

const EXCEL_HEADERS = [
  'P/F', 'COD CLI', 'CLIENTE', 'Tipo', 'UF', 'DT CADASTRO',
  'DT VCTO PROD', 'DT PGTO PROD', 'VLR PGTO PROD',
  'DT VCTO SERV', 'DT PGTO SERV', 'VLR PGTO SERV',
  'VLR COM', 'S1', 'S2', 'G', 'D', 'SC', 'GR', 'EMPRESA',
];

const EXCEL_KEYS = [
  'pf', 'cod', 'cliente', 'tipo', 'uf', 'cadastro',
  'vctoProd', 'pgtoProd', 'vlrPgtoProd',
  'vctoServ', 'pgtoServ', 'vlrPgtoServ',
  'vlrCom', 's1', 's2', 'g', 'd', 'sc', 'gr', 'empresa',
] as const;

type RowRecord = Record<typeof EXCEL_KEYS[number], string>;

function norm(s: string) {
  return String(s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function toNum(s: string) {
  return parseFloat(String(s || '0').replace(/\./g, '').replace(',', '.')) || 0;
}

function br(n: number) {
  return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function money(s: string) {
  return br(toNum(s));
}

function cleanAll(txt: string) {
  let all = ' ' + norm(txt) + ' ';
  all = all.replace(/&eacute;|at&eacute;/gi, 'até');
  all = all.replace(/\bV\s+I\b/g, 'VI').replace(/\bV\s+F\b/g, 'VF').replace(/\bP\s+F\b/g, 'PF').replace(/\bP\s+V\b/g, 'PV');
  all = all.replace(/S1\.\s*\/\s*S2\.\s*\/\s*G\.\s*\/\s*D\.\s*\/\s*SC\s*\/\s*GR/gi, ' S1S2GDSCGR ');
  all = all.replace(/23\/04\/2026,\s*14:15\s*\.\.:\s*Econet Financeiro\s*:\.\./g, ' ');
  all = all.replace(/https?:\/\/\S+/g, ' ');
  return norm(all);
}

function parseOneText(txt: string): RowRecord[] {
  const out: RowRecord[] = [];
  const all = cleanAll(txt);
  const rowMark = /(?:VI|VF|PF|PV)\s*\d{3,6}\b/g;
  const starts: number[] = [];
  let m: RegExpExecArray | null;

  while ((m = rowMark.exec(all)) !== null) starts.push(m.index);

  for (let n = 0; n < starts.length; n++) {
    const block = norm(all.slice(starts[n], starts[n + 1] || all.length));
    const sm = block.match(/^(VI|VF|PF|PV)\s*(\d{3,6})\b/);
    if (!sm) continue;

    let rest = norm(block.slice(sm[0].length));
    rest = rest.replace(/\b\d+\/\d+\s*$/, '').replace(/ECONET EDITORA.*$/i, '');

    const tm = rest.match(/\b(VEN|REN|CAN|SER|OUT)\s+([A-Z]{2})\s+(\d{2}\/\d{2}\/\d{4})\b/);
    if (!tm) continue;

    const cliente = norm(rest.slice(0, tm.index)).replace(/^(?:S1S2GDSCGR|PAG|SUP|EMPRESA|UPGRADE|CLIENTE|Tipo|UF)\s+/i, '');
    const after = norm(rest.slice((tm.index ?? 0) + tm[0].length));

    const dates = after.match(/\d{2}\/\d{2}\/\d{4}/g) || [];
    const monies = after.match(/\d{1,3}(?:\.\d{3})*,\d{2}/g) || [];
    if (monies.length < 2) continue;

    let vctoProd = '', pgtoProd = '', vctoServ = '', pgtoServ = '', vlrPgtoProd = '', vlrPgtoServ = '', vlrCom = '';

    if (monies.length >= 3) {
      vctoProd = dates[0] || '';
      pgtoProd = dates[1] || dates[0] || '';
      vlrPgtoProd = money(monies[0]);
      vlrPgtoServ = money(monies[1]);
      vlrCom = money(monies[2]);
    } else {
      pgtoProd = dates[0] || '';
      pgtoServ = dates[1] || '';
      vlrPgtoProd = money(monies[0]);
      vlrCom = money(monies[1]);
    }

    let nums: string[] = [];
    const pipeMatch = after.match(/(?:\d+\s*\|\s*){1,5}\d+/g);
    if (pipeMatch) {
      const best = pipeMatch.sort((a, b) => (b.match(/\|/g) || []).length - (a.match(/\|/g) || []).length)[0];
      nums = (best.match(/\d+/g) || []).slice(0, 6);
    }
    if (nums.length < 6) {
      const lastMoney = monies[monies.length >= 3 ? 2 : 1];
      const idx = after.indexOf(lastMoney);
      const tail = idx >= 0 ? after.slice(idx + lastMoney.length) : after;
      nums = (tail.match(/\b\d+\b/g) || []).slice(0, 6);
    }
    while (nums.length < 6) nums.push('');

    const empresa = (/\bBoletim\b/i.test(after) || /\bBoletim\b/i.test(rest)) ? 'Boletim' : '';

    out.push({
      pf: sm[1], cod: sm[2], cliente, tipo: tm[1], uf: tm[2], cadastro: tm[3],
      vctoProd, pgtoProd, vlrPgtoProd, vctoServ, pgtoServ, vlrPgtoServ, vlrCom,
      s1: nums[0], s2: nums[1], g: nums[2], d: nums[3], sc: nums[4], gr: nums[5], empresa,
    });
  }
  return out;
}

export function parseRows(extracted: ExtractedPdf | string): RowRecord[] {
  const texts: string[] = [];
  if (typeof extracted === 'string') {
    texts.push(extracted);
  } else {
    texts.push(extracted.raw || '');
    texts.push((extracted.lines || []).join(' '));
  }

  for (const t of texts) {
    const r = parseOneText(t);
    if (r.length) return r;
  }
  return [];
}

export interface SheetResult {
  fileName: string;
  recordCount: number;
}

export function buildExcelWorkbook(
  sheets: { name: string; rows: RowRecord[] }[]
): XLSX.WorkBook {
  const workbook = XLSX.utils.book_new();

  for (let i = 0; i < sheets.length; i++) {
    const { name, rows } = sheets[i];
    const excelData = [EXCEL_HEADERS, ...rows.map(r => EXCEL_KEYS.map(k => r[k] ?? ''))];

    let sheetName = name.replace(/\.pdf$/i, '').substring(0, 31);
    if (workbook.SheetNames.includes(sheetName)) sheetName += `_${i}`;

    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    worksheet['!cols'] = EXCEL_HEADERS.map((_, idx) => ({
      wch: Math.min(Math.max(...excelData.map(r => String(r[idx] || '').length), EXCEL_HEADERS[idx].length) + 2, 50),
    }));

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  }

  return workbook;
}

export function downloadExcel(workbook: XLSX.WorkBook, filename: string) {
  XLSX.writeFile(workbook, filename);
}
