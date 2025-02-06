import { Box } from '@chakra-ui/react'

interface Prop {
  id: number
  value: number
}
const Tile: React.FC<Prop> = ({ id, value }) => {
  // 代表 2, 4, 8, 16....等數字
  // 負責滑動跟合併的動畫
  return (
    <Box
      key={id}
      display="flex"
      borderRadius="15px"
      width="75px"
      height="75px"
      backgroundColor="gray.300"
      alignItems="center"
      justifyContent="center"
    >
      {value}
    </Box>
  )
}

export default Tile
