import { Box } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import SquareButton from '../buttons/SquareButton'

interface SortableItemProps<T extends { id: number; text: string }> {
  item: T
}

const SortableItem = <T extends { id: number; text: string }>({
  item,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  return (
    <Box ref={setNodeRef} {...attributes} {...listeners}>
      <SquareButton text={item.text} m={1}></SquareButton>
    </Box>
  )
}

export default SortableItem
