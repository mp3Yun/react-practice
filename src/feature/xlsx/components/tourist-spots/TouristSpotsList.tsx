import { Box } from '@chakra-ui/react'
import { Tour } from '../../strategy/TourParser'
import TouristSpotItem from './TouristSpotItem'

const TouristSpotsList: React.FC<{ data: Tour[] }> = ({ data }) => {
  return (
    <Box>
      TouristSpotsList
      {data.map((item) => (
        <TouristSpotItem key={item.id} data={item}></TouristSpotItem>
      ))}
    </Box>
  )
}

export default TouristSpotsList
