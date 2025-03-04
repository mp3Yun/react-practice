import { Box } from '@chakra-ui/react'
import { createIcon, PngImgs } from '../utils/icons-utils'

interface Props {
  pngImg: PngImgs
  index: number
  value: string
  hasPair: boolean
  onClick: (value: string, index: number) => void
  isFlipped: boolean // 新增由父層控制的翻轉狀態
}
const MemoryCard: React.FC<Props> = ({
  pngImg,
  index,
  value,
  hasPair = false,
  onClick,
  isFlipped,
}) => {
  const handleClick = () => {
    if (hasPair) return // 已配對的卡片不能點擊
    onClick(value, index) // 傳遞點擊事件給父層
  }

  return (
    <Box
      perspective="1000px" // 設置透視效果
      cursor="pointer"
      onClick={handleClick} // 點擊觸發翻轉
    >
      <Box
        position="relative"
        width="150px" // Ensure card has visible dimensions
        height="150px"
        transformStyle="preserve-3d" // 保留 3D 效果
        transition="transform 0.6s"
        transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'} // 動態控制翻轉
      >
        {/* Front Side */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          backfaceVisibility="hidden" // 隱藏背面
          bg="teal.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="2xl"
        >
          Click Me
        </Box>

        {/* Back Side */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          backfaceVisibility="hidden"
          transform="rotateY(180deg)" // 背面初始翻轉
          bg="orange.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="2xl"
        >
          {createIcon(PngImgs[pngImg], {
            imgProps: { width: 150, height: 150 },
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default MemoryCard
