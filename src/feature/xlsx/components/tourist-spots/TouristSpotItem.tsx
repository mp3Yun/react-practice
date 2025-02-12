import { Box, Text } from '@chakra-ui/react'
import { Tour } from '../../strategy/TourParser'

const TouristSpotItem: React.FC<{ data: Tour }> = ({ data }) => {
  return (
    <Box
      borderBottom="1px dashed var(--chakra-colors-secondary-500)"
      padding="1rem"
      display="flex"
      flexDir="column"
      fontFamily="Noto Sans"
      fontSize="18px"
      gap="0.5rem"
    >
      <Box display="flex" flexDir="row" color="secondary.600" gap="0.5rem">
        <Text fontSize="xl">{data.id}</Text>
        <Text fontSize="xl">{data.name}</Text>
      </Box>
      <Box>資訊: {data.info}</Box>
      <Box>特別的地方: {data.special}</Box>
      <Box>價格: {data.price}</Box>
      <Box>開放日期: {data.openDate}</Box>
      <Box>營業時間: {data.openingHours}</Box>
      <Box>地點: {data.location}</Box>
      <Box>交通: {data.transportation}</Box>
      <Box>通勤時間: {data.commuteTime}</Box>
      <Box>照片: {data.image}</Box>
    </Box>
  )
}

export default TouristSpotItem
