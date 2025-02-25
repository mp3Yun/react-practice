import { Box, BoxProps, Text } from '@chakra-ui/react'
import { SortableContext } from '@dnd-kit/sortable'
import React from 'react'
import { ItemInfo } from './CrossZoneDragger'
import DraggableItem from './DraggableItem'

interface Props<T extends ItemInfo> extends BoxProps {
  data: T[]
  CustomComponent: React.ComponentType<{ item: T }>
}

const SingleDragBlock = <T extends ItemInfo>({
  data,
  CustomComponent,
  ...boxProps
}: Props<T>) => {
  return (
    <SortableContext items={data}>
      <Box
        display="flex"
        flexDir="row"
        flexWrap="wrap"
        gap="0.5rem"
        width="100%"
        {...boxProps}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <DraggableItem<T>
              key={item.id}
              item={item}
              CustomComponent={CustomComponent}
            ></DraggableItem>
          )) // 🟢 當沒有資料時，顯示占位符
        ) : (
          <Text textAlign="center" color="gray.500">
            拖曳項目到這裡
          </Text>
        )}
      </Box>
    </SortableContext>
  )
}

export default SingleDragBlock
