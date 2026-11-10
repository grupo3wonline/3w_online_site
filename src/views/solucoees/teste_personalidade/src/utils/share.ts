import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportPDF(elementId: string, filename = 'resultado.pdf') {
  const el = document.getElementById(elementId);
  if (!el) return;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Height of one PDF page in canvas pixels
  const onePagePx = Math.floor((canvas.width / pageWidth) * pageHeight);

  let pageIndex = 0;
  let yOffset = 0;

  while (yOffset < canvas.height) {
    const sliceHeight = Math.min(onePagePx, canvas.height - yOffset);

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const ctx = pageCanvas.getContext('2d');
    if (!ctx) break;

    ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    // Use JPEG to avoid jsPDF corrupt-PNG issues with large canvases
    const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);

    if (pageIndex > 0) pdf.addPage();
    const sliceHeightMm = (sliceHeight * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, sliceHeightMm);

    yOffset += sliceHeight;
    pageIndex++;
  }

  pdf.save(filename);
}

export function shareWhatsApp(message: string) {
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

export function shareEmail(subject: string, body: string, to: string = '') {
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}
