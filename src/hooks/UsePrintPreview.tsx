import { useState } from 'react'
import { generatePDF } from '../utils/pdf-utils'

const usePrintPreview = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const openPreview = async (content: HTMLElement) => {
    const pdfBlob = await generatePDF(content)
    if (!pdfBlob?.size) return
    const pdfBlobUrl = URL.createObjectURL(pdfBlob)
    setPdfUrl(pdfBlobUrl)
  }

  return {
    pdfUrl,
    openPreview,
  }
}

export default usePrintPreview
