import { Box } from '@chakra-ui/react'

interface CardProps {
  children?: React.ReactNode
  bgColor?: string // 可選的 bgColor 屬性
}
const Card: React.FC<CardProps> = ({ children, bgColor = 'white' }) => {
  return (
    <Box
      padding={'15px'}
      borderRadius={'10px'}
      bgColor={`${bgColor}`}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
      mb={'4'}
      minWidth={'70%'}
      minHeight={'100%'}
    >
      {children}
    </Box>
  )
}

export default Card
