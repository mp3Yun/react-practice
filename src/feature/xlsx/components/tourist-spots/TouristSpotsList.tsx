import { Box } from '@chakra-ui/react'
import TouristSpotItem, { TourDetailValue } from './TouristSpotItem'

const TouristSpotsList: React.FC<{
  data: TourDetailValue[]
  justForShow?: boolean
}> = ({ data, justForShow }) => {
  return (
    <Box>
      TouristSpotsList
      {data.map((item) => (
        <TouristSpotItem
          key={item.id.value}
          data={item}
          justForShow={justForShow}
        ></TouristSpotItem>
      ))}
    </Box>
  )
}

export default TouristSpotsList
