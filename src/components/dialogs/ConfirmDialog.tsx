import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import React from 'react'

interface Props {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
  confirmTitle: string
  confirmMessage: string
  confirmText?: string
  cancelText?: string
}
const ConfirmDialog: React.FC<Props> = (props) => {
  const {
    isOpen,
    onConfirm,
    onClose,
    confirmTitle,
    confirmMessage,
    confirmText,
    cancelText,
  } = props
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{confirmTitle}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{confirmMessage}</AlertDialogBody>
          <AlertDialogFooter>
            <Button variant={'primary'} onClick={onConfirm}>
              {confirmText || '確認'}
            </Button>
            <Button
              variant={'secondary'}
              ref={cancelRef}
              ml={3}
              onClick={onClose}
            >
              {cancelText || '取消'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ConfirmDialog
