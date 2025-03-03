import { Box } from '@chakra-ui/react'
import React from 'react'
import HotelItem, { HotelDetailValue } from './HotelItem'

const HotelsList: React.FC<{
  data: HotelDetailValue[]
  justForShow?: boolean
}> = ({ data, justForShow }) => {
  return (
    <Box>
      HotelsList
      {data.map((item) => (
        <HotelItem
          key={item.id.value}
          data={item}
          justForShow={justForShow}
        ></HotelItem>
      ))}
    </Box>
  )
}

export default HotelsList
