import { Box } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'

interface SortableItemProps<T extends { id: number; text: string }> {
  item: T
  CustomComponent: React.ComponentType<{ item: T }> // 傳遞元件類型
}

const SortableItem = <T extends { id: number; text: string }>({
  item,
  CustomComponent,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  return (
    <Box ref={setNodeRef} {...attributes} {...listeners}>
      {/* <SquareButton
        text={item.text}
        m={1}
        _hover={{ bg: 'primary.300' }}
        _active={{ bg: 'primary.500', transform: 'scale(0.95)' }}
      ></SquareButton> */}
      <CustomComponent item={item} />
    </Box>
  )
}

export default SortableItem
