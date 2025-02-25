import React from 'react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import { Box, Text } from '@chakra-ui/react'
import SingleDragBlock from '../../../../components/dragDrop/SingleDragBlock'
import { TripCard } from './TripCard'

interface Props {
  pendingHotels: ItemInfo[]
}

const PendingHotels: React.FC<Props> = ({ pendingHotels }) => {
  return (
    <Box display="flex" flexDir="column">
      <Box
        className="show-border"
        padding="5px"
        display="flex"
        flexDir="row"
        width="100%"
        borderRadius="2xl"
      >
        <Box
          margin="1rem"
          alignContent="center"
          borderRight="2px solid var(--chakra-colors-gray-300)"
          fontSize="2xl"
        >
          <Text width="6vw" textAlign="center" justifySelf="center">
            住宿
          </Text>
        </Box>

        <Box
          width="100%"
          display="flex"
          flexDir="row"
          padding="0.5rem"
          gap="0.5rem"
          justifyContent="center"
        >
          <SingleDragBlock
            data={pendingHotels}
            CustomComponent={TripCard}
            alignContent="center"
          ></SingleDragBlock>
        </Box>
      </Box>
    </Box>
  )
}

export default PendingHotels
