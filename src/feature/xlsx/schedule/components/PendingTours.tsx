import { Box, Text } from '@chakra-ui/react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import SingleDragBlock from '../../../../components/dragDrop/SingleDragBlock'
import { TripCard } from '../SchedulePage'

interface Props {
  pendingTours: ItemInfo[]
}

const PendingTours: React.FC<Props> = ({ pendingTours }) => {
  // TODO: 點擊單張卡片的時候，跳出 popup ，顯示該張卡片的資訊
  // Tours 有它的格式(畫面)
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
            景點
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
            data={pendingTours}
            CustomComponent={TripCard}
            alignContent="center"
          ></SingleDragBlock>
        </Box>
      </Box>
    </Box>
  )
}

export default PendingTours
