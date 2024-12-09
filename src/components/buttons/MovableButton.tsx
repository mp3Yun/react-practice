import { Button } from '@chakra-ui/react'
import { useState } from 'react'

const MovableButton = () => {
  // 初始位置
  const [positionY, setPositionY] = useState(0)

  // 控制按鈕位置的函數
  const handleMoveUp = () => {
    setPositionY(positionY - 20) // 向上移動10px
  }

  const handleMoveDown = () => {
    setPositionY(positionY + 10) // 向下移動10px
  }

  return (
    <div>
      {/* 可以控制上下移動 */}
      <Button
        position="fixed"
        bottom="0"
        right="0"
        transform={`translateY(${positionY}px)`}
        onClick={handleMoveUp} // 點擊按鈕移動
        p={4}
        bg="blue.500"
        color="white"
        _hover={{ bg: 'blue.600' }}
      >
        Move Me
      </Button>

      {/* 按鈕位置控制 */}
      <Button
        position="fixed"
        bottom="50px"
        right="0"
        onClick={handleMoveDown} // 點擊按鈕移動
        p={4}
        bg="green.500"
        color="white"
        _hover={{ bg: 'green.600' }}
      >
        Move Down
      </Button>
    </div>
  )
}

export default MovableButton
