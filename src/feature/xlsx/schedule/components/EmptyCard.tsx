import { Box } from '@chakra-ui/react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'

export const EmptyCard = <T extends ItemInfo>({ item }: { item: T }) => (
  <Box
    padding="5px"
    display="flex"
    flexDir="column"
    borderRadius="2xl"
    height="5rem"
  >
    {item.text}
  </Box>
)
