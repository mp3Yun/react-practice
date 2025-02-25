import { Box } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core'
import { SortableItemProps } from './SortableItem'

const DraggableItem = <T extends { id: string; text: string }>({
  item,
  CustomComponent,
}: SortableItemProps<T>) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
  })

  return (
    <Box ref={setNodeRef}>
      <CustomComponent {...attributes} {...listeners} item={item} />
    </Box>
  )
}

export default DraggableItem
