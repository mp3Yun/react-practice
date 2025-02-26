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
