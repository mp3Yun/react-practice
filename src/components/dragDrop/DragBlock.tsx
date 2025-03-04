import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'

export interface DraggableProps<T> {
  data: T[]
  onDragEndEvent?: (items: T[]) => void
  CustomComponent: React.ComponentType<{ item: T }> // 傳遞元件類型
}

const DragBlock = <T extends { id: number; text: string }>({
  data,
  onDragEndEvent,
  CustomComponent,
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
        const newItems = arrayMove(items, oldIndex, newIndex)

        // 確保這裡的 items 是最新的狀態
        onDragEndEvent && onDragEndEvent(newItems)
        return newItems
      })
    }
  }
  console.log('items', items)
  console.log('CustomComponent', CustomComponent)

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        {/* <SortableContext items={items}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {items.map((item, index) => (
              <SortableItem<T>
                key={index}
                item={item}
                CustomComponent={CustomComponent}
              />
            ))}
          </Box>
        </SortableContext> */}
      </DndContext>
    </>
  )
}

export default DragBlock
