import React from 'react'
import { ItemInfo } from './CrossZoneDragger'
import { SortableContext } from '@dnd-kit/sortable'
import { Box, Text } from '@chakra-ui/react'
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
      <Box
        display="flex"
        flexDir="row"
        flexWrap="wrap"
        gap="0.5rem"
        className="show-border"
        width="90%"
      >
        {data.length > 0 ? (
          data.map((item) => (
            <SortableItem<T>
              key={item.id}
              item={item}
              CustomComponent={CustomComponent}
            ></SortableItem>
          )) // 🟢 當沒有資料時，顯示占位符
        ) : (
          <Text textAlign="center" color="gray.500">
            拖曳項目到這裡
          </Text>
        )}
        {}
      </Box>
    </SortableContext>
  )
}

export default SingleDragBlock
