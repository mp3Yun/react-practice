import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'
import { Box } from '@chakra-ui/react'

function DraggableItem() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-item',
  })

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      width="100px"
      height="100px"
      bg="blue.400"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transform={
        transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
      }
      transition="transform 0.1s ease-out"
    >
      拖動我
    </Box>
  )
}

export default function DragExample() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <DndContext
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={() => setActiveId(null)}
    >
      <DraggableItem />
      <DragOverlay>
        {activeId ? <Box width="100px" height="100px" bg="red.400" /> : null}
      </DragOverlay>
    </DndContext>
  )
}
