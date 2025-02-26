import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface PrintOptions {
  // 要列印的 HTML 元素
  content: HTMLElement
  // PDF 頁面寬度(mm)
  pageWidth?: number
  // PDF 頁面高度(mm)
  pageHeight?: number
  // 邊距
  margin?: number
}

// 用於生成 PDF 的邏輯
export const generatePDF = async (content: HTMLElement) => {
  if (!content) return null

  console.error('99-content.offsetWidth=>', content.offsetWidth)
  console.error('99-content.offsetHeight=>', content.offsetHeight)
  const pdf = new jsPDF('p', 'mm', 'a4')
  console.error('99-generatePDF=>', pdf)
  const canvas = await html2canvas(content, {
    scale: 2, // 增加解析度
    useCORS: true, // 處理跨域圖片
  })
  console.error("99-I'm stop here ? =>", canvas)
  const imgData = canvas.toDataURL('image/png')
  console.error('99-imgData ? =>', imgData)
  const contentWidth = canvas.width * 0.264583
  const contentHeight = canvas.height * 0.264583
  const maxWidth = 210 - 20 // A4寬度減去邊距
  const maxHeight = 297 - 20 // A4高度減去邊距
  let scale = contentHeight > maxHeight ? maxHeight / contentHeight : 1
  console.error('99-contentWidth ? =>', contentWidth)
  console.error('99-contentHeight ? =>', contentHeight)
  console.error('99-maxWidth ? =>', maxWidth)
  console.error('99-maxHeight ? =>', maxHeight)
  pdf.addImage(
    imgData,
    'PNG',
    10,
    10,
    contentWidth * scale,
    contentHeight * scale
  )

  return pdf.output('blob') // 返回 Blob 資料
}

export const printToPDF = async ({
  content,
  pageWidth = 210, // A4 width (mm)
  pageHeight = 297, // A4 Height (mm)
  margin = 10,
}: PrintOptions) => {
  if (!content) return

  // 設定 A4 大小 PDF
  const pdf = new jsPDF('p', 'mm', 'a4')
  // 轉換 HTML 為高解析度 canvas
  const canvas = await html2canvas(content, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  // px 轉 mm
  const contentWidth = canvas.width * 0.264583
  const contentHeight = canvas.height * 0.264583

  // 可用內容區域
  const maxWidth = pageWidth - margin * 2
  const maxHeight = pageHeight - margin * 2

  let scale = 1
  if (contentHeight > maxHeight) {
    scale = maxHeight / contentHeight // Y 軸縮放
  }

  // 根據 X 軸計算是否有需要分頁
  let pages = Math.ceil(contentWidth / maxWidth)
  // 計算當前 x 的顯示內容寬度
  let offsetX = 0

  for (let i = 0; i < pages; i++) {
    // 從第2頁開始，新增頁面
    if (i > 0) pdf.addPage()

    pdf.addImage(
      imgData,
      'PNG',
      margin - offsetX,
      margin,
      contentWidth * scale,
      contentHeight * scale
    )

    offsetX += maxWidth
  }

  // 下載 PDF
  pdf.save('download.pdf')
}

/** 在新的分頁預覽 PDF */
export const previewPDF = async ({
  content,
  pageWidth = 210,
  pageHeight = 297,
  margin = 10,
}: PrintOptions) => {
  if (!content) return

  const pdf = new jsPDF('p', 'mm', 'a4')
  const canvas = await html2canvas(content, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  const contentWidth = canvas.width * 0.264583
  const contentHeight = canvas.height * 0.264583
  const maxWidth = pageWidth - margin * 2
  const maxHeight = pageHeight - margin * 2
  let scale = contentHeight > maxHeight ? maxHeight / contentHeight : 1

  pdf.addImage(
    imgData,
    'PNG',
    margin,
    margin,
    contentWidth * scale,
    contentHeight * scale
  )

  // 產生 Blob，並開啟新分頁
  const pdfBlob = pdf.output('blob')
  const pdfUrl = URL.createObjectURL(pdfBlob)
  // 在新分頁開啟 PDF
  window.open(pdfUrl, '_blank')
}

/** 在 popup 視窗中，預覽 PDF */
export const PrintPreviewPDF = async ({}) => {}
