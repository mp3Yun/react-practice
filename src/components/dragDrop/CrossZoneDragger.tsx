import { Box } from '@chakra-ui/react'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import SingleDragBlock from './SingleDragBlock'

export interface ItemInfo {
  /** 排序使用的 id */
  id: string
  /** 原本的 id */
  origId: number
  text: string
}

interface CrossZoneDraggerProps<T extends ItemInfo> {
  data: Record<string, T[]>
  onDragEnd: (event: DragEndEvent) => void // 父層傳入的拖拉事件
  CustomComponent: React.ComponentType<{ item: T }> // 傳遞元件類型 TODO: 那我這邊不就也要分成三種?
}

const CrossZoneDragger = <T extends ItemInfo>({
  data,
  onDragEnd,
  CustomComponent,
}: CrossZoneDraggerProps<T>) => {
  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
        }}
      >
        {Object.keys(data).map((key) => (
          <SingleDragBlock
            key={key}
            data={data[key]}
            CustomComponent={CustomComponent}
          ></SingleDragBlock>
        ))}
      </Box>
    </DndContext>
  )
}

export default CrossZoneDragger
