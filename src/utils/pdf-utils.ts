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

export const generatePDFwithHtml2canvasOld = async (
  content: HTMLElement,
  id: string
) => {
  const element = document.getElementById(id)
  if (!element) {
    throw 'No element, please check again.'
  }
  const pdf = new jsPDF('p', 'mm', 'a4')

  // 克隆元素，並調整大小讓其內容完整展開
  const cloned = element.cloneNode(true) as HTMLElement
  // 取得該元素整個內容的高度
  cloned.style.height = `${element.scrollHeight}px`
  cloned.style.overflow = 'visible' // 移除滾動條

  // 把克隆的內容放進 body (但設為隱藏)
  document.body.appendChild(cloned)
  cloned.style.position = 'absolute'
  cloned.style.left = '-9999px' // 避免影響原畫面

  /*****************************************************************************************
   * 計算 A4 紙張的尺寸（以像素 px 為單位），
   * 根據螢幕的 DPI（每英寸點數） 和 devicePixelRatio（裝置像素比例） 來轉換。
   ****************************************************************************************/
  // 設定紙張大小 (A4)
  const paperWidth = 210 // mm
  const pageHeight = 297 // mm
  // 假設螢幕 DPI * 螢幕的像素比例
  const dpi = 96 * window.devicePixelRatio
  // 一英吋為 25.4 mm，計算 A4 尺寸的像素大小
  const maxWidthPx = (paperWidth / 25.4) * dpi
  const maxHeightPx = (pageHeight / 25.4) * dpi

  // 計算縮放比例
  const scale = Math.min(
    maxWidthPx / cloned.offsetWidth,
    maxHeightPx / cloned.offsetHeight
  )

  // 轉換為 Canvas (截圖)
  const canvas = await html2canvas(cloned, {
    scale,
  })
  document.body.removeChild(cloned) // 截完後移除

  /*****************************************************************************************
   * canvas 轉圖片
   * 注意: PDF 使用 mm 單位，而 Canvas 使用 px
   *****************************************************************************************/
  const imgData = canvas.toDataURL('image/png')
  // 把 px 轉成 mm（因為 1 px ≈ 0.264583 mm）。
  const contentWidth = canvas.width * 0.264583
  const contentHeight = canvas.height * 0.264583
  const maxWidth = 210 - 20 // A4寬度減去邊距
  const maxHeight = 297 - 20 // A4高度減去邊距
  // 這裡的 scaleImg 主要是確保圖片高度不超出 A4 頁面
  let scaleImg = Math.min(maxWidth / contentWidth, maxHeight / contentHeight, 1)
  pdf.addImage(
    imgData,
    'PNG',
    10,
    10,
    contentWidth * scaleImg,
    contentHeight * scaleImg
  )

  return pdf.output('blob') // 返回 Blob 資料
}

export const generatePDFwithHtml2canvas = async (
  content: HTMLElement,
  id: string
) => {
  const element = document.getElementById(id)
  if (!element) {
    throw 'No element, please check again.'
  }
  const pdf = new jsPDF('p', 'mm', 'a4')

  // 克隆元素，並調整大小讓其內容完整展開
  const cloned = element.cloneNode(true) as HTMLElement
  // 取得該元素整個內容的高度
  cloned.style.height = `${element.scrollHeight}px`
  cloned.style.overflow = 'visible' // 移除滾動條
  // 找到特定 class 的元素，修改 style
  cloned
    .querySelectorAll('.chakra-timeline__connector')
    .forEach((connector) => {
      // 直接選取 .chakra-timeline__connector 下的 <p> 元素
      const pElement = connector.querySelector('p')

      if (pElement) {
        ;(pElement as HTMLElement).style.setProperty('top', '-7px', 'important')
      }
    })

  cloned
    .querySelectorAll(
      '.chakra-timeline__content > .chakra-timeline__title > span'
    )
    .forEach((span) => {
      // 這裡可以對每個 span 做處理
      if (span) {
        ;(span as HTMLElement).style.setProperty(
          'position',
          'relative',
          'important'
        )
        ;(span as HTMLElement).style.setProperty('top', '-7px', 'important')
      }
    })

  // 把克隆的內容放進 body (但設為隱藏)
  document.body.appendChild(cloned)
  cloned.style.position = 'relative'
  cloned.style.left = '-9999px' // 避免影響原畫面

  /*****************************************************************************************
   * 計算 A4 紙張的尺寸（以像素 px 為單位），
   * 根據螢幕的 DPI（每英寸點數） 和 devicePixelRatio（裝置像素比例） 來轉換。
   ****************************************************************************************/
  // 設定紙張大小 (A4)
  const paperWidth = 210 // mm
  const pageHeight = 297 // mm
  // 假設螢幕 DPI * 螢幕的像素比例
  const dpi = 96 * window.devicePixelRatio
  // 一英吋為 25.4 mm，計算 A4 尺寸的像素大小
  const maxHeightPx = (pageHeight / 25.4) * dpi

  const canvas = await html2canvas(cloned)
  document.body.removeChild(cloned) // 截完後移除

  /*****************************************************************************************
   * canvas 轉圖片
   * 注意: PDF 使用 mm 單位，而 Canvas 使用 px
   *****************************************************************************************/
  // 計算根據裡面子元素數量來決定切割點 (每3個元素為一頁，切成多個頁面)
  const subElementArray = Array.from(
    element.querySelectorAll('.tab-panels-content')
  )

  // 單一日程的元素寬度
  const subElementWidth = (subElementArray[0] as HTMLElement)?.offsetWidth
  const subElementHeight = (subElementArray[0] as HTMLElement)?.scrollHeight
  const splitCount = 2
  const singlePageWidth = subElementWidth * splitCount
  let pageCount = Math.ceil(subElementArray.length / splitCount)
  // 把 px 轉成 mm（因為 1 px ≈ 0.264583 mm）。
  const contentHeight = subElementHeight * 0.264583
  const maxWidth = paperWidth - 20
  const maxHeight = pageHeight - 20 // A4高度減去邊距
  let scaleImg = Math.min(
    maxWidth / (singlePageWidth * 0.264583),
    maxHeight / contentHeight, // 根據高度來縮放
    1 // 固定寬度不變
  )
  for (let page = 0; page < pageCount; page++) {
    if (page > 0) pdf.addPage() // 添加新頁面 (第一頁不需要)
    // 計算裁切的寬度區域 (一頁可以放3個元素)
    const sourceX = page * singlePageWidth
    const cropWidth = Math.min(singlePageWidth, canvas.width - sourceX)

    // 創建新的 Canvas，進行裁切
    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = cropWidth
    pageCanvas.height = subElementHeight
    const ctx = pageCanvas.getContext('2d')
    if (ctx) {
      // 裁切指定區域
      ctx.drawImage(
        canvas,
        sourceX,
        0,
        cropWidth,
        canvas.height,
        0,
        0,
        cropWidth,
        maxHeightPx
      )
    }

    // 轉為圖片
    const pageImgData = pageCanvas.toDataURL('image/png')

    // 設定標題的文字內容
    const title = 'My Travel'

    // 設定標題的字型和大小
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(14)

    // 設定標題的顏色（可選）
    pdf.setTextColor(0, 0, 0) // 黑色

    // 在每頁上添加標題
    pdf.text(title, 10, 15) // 10mm 水平距離，15mm 垂直距離（距離頁面上邊的距離）

    // 插入 PDF
    pdf.addImage(
      pageImgData,
      'PNG',
      10,
      30,
      cropWidth * 0.264583 * scaleImg, // px 轉 mm
      contentHeight * scaleImg // 固定高度
    )
  }

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
