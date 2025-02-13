import { Box } from '@chakra-ui/react'
import TourDetail from '../../../../helper/report-parser-content/reports/tours-parser/tour-detail'
import TouristSpotItem, { TourDetailValue } from './TouristSpotItem'

const TouristSpotsList: React.FC<{ data: TourDetailValue[] }> = ({ data }) => {
  return (
    <Box>
      TouristSpotsList
      {data.map((item) => (
        <TouristSpotItem key={item.id.value} data={item}></TouristSpotItem>
      ))}
    </Box>
  )
}

export default TouristSpotsList
