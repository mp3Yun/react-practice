import { Box, Text } from '@chakra-ui/react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'

const TimeOccupiedCard = <T extends ItemInfo>({}: { item: T }) => {
  return (
    <Box
      padding="5px"
      display="flex"
      flexDir="column"
      borderRadius="md"
      height="4rem"
      border={'2px solid gray.600'}
      style={{
        background: 'linear-gradient(45deg, #d3d3d3 25%, transparent 25%)',
        backgroundSize: '10px 10px', // 調整斜線的密度
        backgroundRepeat: 'repeat', // 重複背景
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="md" textAlign="center" bgColor="white" width="2rem">
        同上
      </Text>
    </Box>
  )
}

export default TimeOccupiedCard
