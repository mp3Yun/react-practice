import { Box, Text } from '@chakra-ui/react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import SingleDragBlock from '../../../../components/dragDrop/SingleDragBlock'
import { TripCard } from './TripCard'

interface Props {
  pendingTours: ItemInfo[]
}

const PendingTours: React.FC<Props> = ({ pendingTours }) => {
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
