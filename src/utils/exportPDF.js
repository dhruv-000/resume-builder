let html2pdfLoader = null

export const exportPDF = async (element, filename = 'resume.pdf') => {
  if (!element) return false

  if (!html2pdfLoader) {
    html2pdfLoader = import('html2pdf.js')
  }

  const html2pdfModule = await html2pdfLoader
  const html2pdf = html2pdfModule.default || html2pdfModule

  const options = {
    margin: [8, 8, 8, 8],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      letterRendering: true,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] },
  }

  await html2pdf().set(options).from(element).save()
  return true
}
