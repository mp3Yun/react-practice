import {
  Button,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onCheck: () => void
  onClose: () => void
}

const LeaveWarningModal: React.FC<Props> = ({ isOpen, onCheck, onClose }) => {
  return (
    <>
      <DialogRoot open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>未儲存的變更</DialogHeader>
          <DialogBody>你有未儲存的變更，是否確定離開？</DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={onClose}>
              取消
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onCheck()
                onClose()
              }}
            >
              確定
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default LeaveWarningModal
