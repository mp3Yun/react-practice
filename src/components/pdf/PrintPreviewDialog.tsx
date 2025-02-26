import {
  Button,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Portal,
} from '@chakra-ui/react'

interface PrintPreviewDialogProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string | null
}

const PrintPreviewDialog: React.FC<PrintPreviewDialogProps> = ({
  isOpen,
  onClose,
  pdfUrl,
}) => {
  console.error('[PrintPreviewDialog]-pdfUrl=>', pdfUrl)
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = 'preview.pdf'
      link.click()
    }
  }

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={onClose}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogContent
        style={{
          width: '80vw',
          maxWidth: '800px',
          height: 'auto',
        }}
      >
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>PDF PREVIEW</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="600px" />
          ) : (
            <p>生成預覽中...</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button colorScheme="blue" onClick={handleDownload}>
            下載 PDF
          </Button>
          <Button variant="ghost" onClick={onClose}>
            關閉
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default PrintPreviewDialog
