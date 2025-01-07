import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
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
    children,
  } = props
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  return (
    <>
      <DialogRoot
        open={isOpen}
        onOpenChange={onClose}
        motionPreset="slide-in-bottom"
      >
        <DialogContent>
          <DialogHeader>{confirmTitle}</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            {children}
            {confirmMessage}
          </DialogBody>
          <DialogFooter>
            <Button variant="solid" onClick={onConfirm}>
              {confirmText || '確認'}
            </Button>
            <Button variant="solid" ref={cancelRef} ml={3} onClick={onClose}>
              {cancelText || '取消'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default ConfirmDialog
