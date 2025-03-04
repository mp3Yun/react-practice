import {
  Button,
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
        <DialogContent
          position="fixed" // 固定位置
          top="50%" // 垂直居中
          left="50%" // 水平居中
          transform="translate(-50%, -50%)" // 位移使元素完全置中
          zIndex="overlay" // 確保在最上層
          maxWidth="sm" // 可根據需要調整寬度
          bg="white" // 背景色
          boxShadow="lg" // 加陰影
          borderRadius="md" // 邊角圓滑
          p={4} // 設置內邊距
        >
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
