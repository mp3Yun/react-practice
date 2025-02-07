import { useToken } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export interface TileProp {
  id: number
  actionId: number
  value: number
  position: { x: number; y: number }
  isNew: boolean
}

const Tile: React.FC<TileProp & { gap: number }> = ({
  id,
  actionId,
  value,
  position,
  gap,
  isNew,
}) => {
  const cellSize = 75

  const tileColors: Record<number, string> = {
    2: '#f5fffd', // 最淺的顏色
    4: '#e9f7f5',
    8: '#e0f7f3', // 原始的最淺顏色
    16: '#b2ebf2',
    32: '#a0e6e6',
    64: '#80e0e0',
    128: '#66d6d6',
    256: '#4dd2d3',
    512: '#26c6da',
    1024: '#00bcd4', // 最深的顏色
    2048: '#00acc1', // 最深的顏色，可以用來代表 2048
  }

  // 2 4 8 16 32 64 128 256 512 1024 2048 不同顏色
  const getTileColor = (value: number): string => tileColors[value] || '#ffffff' // 如果沒有對應的值，返回預設顏色

  const secondary100 = useToken('colors', 'secondary.100')
  const secondary300 = useToken('colors', 'secondary.300')

  return (
    <motion.div
      key={id + actionId}
      initial={
        isNew
          ? { scale: 0.8, backgroundColor: `${secondary100}`, opacity: 0.8 }
          : { scale: 1, backgroundColor: getTileColor(value), opacity: 1 }
      }
      animate={{
        scale: 1,
        backgroundColor: isNew ? `${secondary300}` : getTileColor(value),
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
      style={{
        position: 'absolute',
        top: `${position.y * (cellSize + gap)}px`,
        left: `${position.x * (cellSize + gap)}px`,
        display: 'flex',
        borderRadius: '10px',
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'top 0.2s ease-in-out, left 0.2s ease-in-out',
      }}
    >
      {value}
    </motion.div>
  )
}

export default Tile
