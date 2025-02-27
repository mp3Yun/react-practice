import { useState } from 'react'
import { generatePDFwithHtml2canvas } from '../utils/pdf-utils'

const usePrintPreview = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const openPreviewWithHtml2canvas = async (
    content: HTMLElement,
    elementId: string
  ) => {
    const pdfBlob = await generatePDFwithHtml2canvas(content, elementId)
    if (!pdfBlob?.size) return
    const pdfBlobUrl = URL.createObjectURL(pdfBlob)
    setPdfUrl(pdfBlobUrl)
  }

  return {
    pdfUrl,
    openPreviewWithHtml2canvas,
  }
}

export default usePrintPreview
