import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)

interface Piece {
  x: number
  delay: number
  rotation: number
  color: string
}

interface Props {
  confettiNumber?: number
}
const Confetti: React.FC<Props> = ({ confettiNumber = 30 }) => {
  const [confettiPieces, setConfettiPieces] = useState<Piece[]>([])

  useEffect(() => {
    // 隨機生成 X || 30 個彩帶
    const pieces = Array.from({ length: confettiNumber }, () => ({
      x: Math.random() * 100, // 隨機水平位置 (百分比)
      delay: Math.random() * 2, // 隨機延遲 (秒)
      rotation: Math.random() * 360, // 隨機旋轉角度
      color: `hsl(${Math.random() * 360}, 70%, 50%)`, // 隨機顏色
    }))
    setConfettiPieces(pieces)
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      pointerEvents="none"
    >
      {confettiPieces.map((piece, index) => (
        <MotionBox
          key={index}
          position="absolute"
          width="10px"
          height="25px"
          bg={piece.color}
          style={{
            left: `${piece.x}%`, // 設定水平位置
            transformOrigin: 'center', // 動畫旋轉中心
          }}
          initial={{ y: -50, rotate: piece.rotation }} // 初始位置和角度
          animate={{
            y: '100vh', // 從頂部掉落到底部
            rotate: piece.rotation + 360, // 自轉動畫
          }}
          transition={{
            duration: 5, // 掉落時間
            ease: [0.25, 0.1, 0.25, 1], // 貝塞爾曲線對應 'ease-out'
            delay: piece.delay, // 延遲開始
            repeat: 0, // 不重複
          }}
        />
      ))}
    </Box>
  )
}

export default Confetti
