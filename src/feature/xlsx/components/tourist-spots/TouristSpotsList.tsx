import { Box } from '@chakra-ui/react'
import TouristSpotItem, { SpotDetailValue } from './TouristSpotItem'

const TouristSpotsList: React.FC<{
  data: SpotDetailValue[]
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
