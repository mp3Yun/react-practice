import { Box } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'

export interface SortableItemProps<T extends { id: string; text: string }> {
  item: T
  dndType?: string
  CustomComponent: React.ComponentType<{ item: T }> // 傳遞元件類型
}

const SortableItem = <T extends { id: string; text: string }>({
  item,
  dndType,
  CustomComponent,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: item.id,
    data: {
      dndType: dndType,
    },
  })

  return (
    <Box ref={setNodeRef}>
      <CustomComponent {...attributes} {...listeners} item={item} />
    </Box>
  )
}

export default SortableItem
