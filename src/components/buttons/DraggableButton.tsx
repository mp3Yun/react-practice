import { Button } from '@chakra-ui/react'
import { useRef, useState } from 'react'

const DraggableButton = () => {
  const [position, setPosition] = useState({ x: 20, y: 50 })
  const isDragging = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 }) // 儲存上一次滑鼠位置

  // 按下滑鼠
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
  }

  // 拖動滑鼠
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      const defaultY = e.clientY - lastMousePosition.current.y

      setPosition((prev) => ({
        x: prev.x,
        y: prev.y + defaultY,
      }))
      lastMousePosition.current = { x: e.clientX, y: e.clientY } // 更新滑鼠位置
    }
  }

  // 放開滑鼠
  const handleMouseUp = () => {
    isDragging.current = false
  }

  return (
    <>
      <Button
        position="fixed"
        bottom="0"
        right="0"
        // transform={`translateY(${position.y}px)`} // 這個會很慢，不知道為啥
        top={`${position.y}px`}
        onMouseDown={handleMouseDown} // 點擊按鈕移動
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        p={4}
        bg="blue.500"
        color="white"
        _hover={{ bg: 'blue.600' }}
      >
        Drag Me
      </Button>
    </>
  )
}

export default DraggableButton
