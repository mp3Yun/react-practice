import React from 'react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import { Box, Text } from '@chakra-ui/react'
import SingleDragBlock from '../../../../components/dragDrop/SingleDragBlock'
import { TripCard } from '../SchedulePage'

interface Props {
  pendingHotels: ItemInfo[]
}

const PendingHotels: React.FC<Props> = ({ pendingHotels }) => {
  // TODO: 點擊單張卡片的時候，跳出 popup ，顯示該張卡片的資訊
  // Hotel 有它的格式(畫面)
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
