import { Box } from '@chakra-ui/react'
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  DndContext,
  closestCenter,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import SortableItem from './SortableItem'

export interface DraggableProps<T> {
  data: T[]
  onDragEndEvent?: (items: T[]) => void
}
const DragBlock = <T extends { id: number; text: string }>({
  data,
  onDragEndEvent,
}: DraggableProps<T>) => {
  const [items, setItems] = useState(data)

  // 設置感應器 (鼠標拖動 + 鍵盤支持)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {items.map((item, index) => (
              <SortableItem<T> key={index} item={item} />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default DragBlock
