import { Box, Text } from '@chakra-ui/react'
import { useStore } from '../../../hooks/contexts/store-context/UseStore'

const SchedulePage: React.FC = () => {
  const { storeData } = useStore()
  const tours = storeData?.xlsx?.tours
  return (
    <Box display="flex" flexDir="column">
      <Box
        className="show-border"
        padding="5px"
        display="flex"
        flexDir="row"
        borderRadius="2xl"
      >
        <Text
          fontSize="2xl"
          margin="1rem"
          width="6vw"
          borderRight="2px solid var(--chakra-colors-gray-300)"
          textAlign="center"
          justifySelf="center"
        >
          景點
        </Text>
        <Box
          width="auto"
          display="flex"
          flexDir="row"
          padding="0.5rem"
          gap="0.5rem"
        >
          {tours?.map((tour) => (
            <Box
              key={tour.id.value}
              width="auto"
              textAlign="center"
              padding="1rem"
              className="show-border"
              borderRadius="xl"
              onClick={() => {}}
            >
              <Text fontSize="xl">{tour.name.value}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default SchedulePage
