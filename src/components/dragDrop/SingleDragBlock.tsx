import React from 'react'
import { ItemInfo } from './CrossZoneDragger'
import { SortableContext } from '@dnd-kit/sortable'
import { Box } from '@chakra-ui/react'
import SortableItem from './SortableItem'

interface Props<T extends ItemInfo> {
  data: T[]
  CustomComponent: React.ComponentType<{ item: T }>
}

const SingleDragBlock = <T extends ItemInfo>({
  data,
  CustomComponent,
}: Props<T>) => {
  return (
    <SortableContext items={data}>
      <Box display="flex" flexWrap="wrap" gap="0.5rem">
        {data.map((item) => (
          <SortableItem<T>
            key={item.id}
            item={item}
            CustomComponent={CustomComponent}
          ></SortableItem>
        ))}
      </Box>
    </SortableContext>
  )
}

export default SingleDragBlock
