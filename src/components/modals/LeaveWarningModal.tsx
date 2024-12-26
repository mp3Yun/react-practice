import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onCheck: () => void
  onClose: () => void
}
const LeaveWarningModal: React.FC<Props> = ({ isOpen, onCheck, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>未儲存的變更</ModalHeader>
          <ModalBody>你有未儲存的變更，是否確定離開？</ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LeaveWarningModal
