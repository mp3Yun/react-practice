import { Box } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'

export const TripCard = <T extends ItemInfo>({ item }: { item: T }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
    })

  const handleMouseUp = () => {
    if (!isDragging) {
      console.log('Card clicked! 展開 Popup', isDragging)
      // 在這裡觸發打開 Popup 的邏輯 TODO:
    }
  }
  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="show-border"
      padding="5px"
      display="flex"
      flexDir="column"
      borderRadius="2xl"
      bgColor="white"
      transform={
        transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
      }
      transition="transform 0.1s ease-out"
      zIndex="15"
      onMouseUp={handleMouseUp}
    >
      {item.text}
    </Box>
  )
}
