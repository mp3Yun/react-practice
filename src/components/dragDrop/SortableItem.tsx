import { Box } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'

export interface SortableItemProps<T extends { id: string; text: string }> {
  item: T
  CustomComponent: React.ComponentType<{ item: T }> // 傳遞元件類型
}

const SortableItem = <T extends { id: string; text: string }>({
  item,
  CustomComponent,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  return (
    <Box ref={setNodeRef}>
      <CustomComponent {...attributes} {...listeners} item={item} />
    </Box>
  )
}

export default SortableItem
