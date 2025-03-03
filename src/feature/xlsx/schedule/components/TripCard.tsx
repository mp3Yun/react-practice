import { Box, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core'
import { useRef } from 'react'
import { CiSquareAlert } from 'react-icons/ci'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import { useDragContext } from '../../../../hooks/contexts/drag-context/UseDragContext'
import DetailTripCard from './DetailTripCard'

export const TripCard = <T extends ItemInfo>({ item }: { item: T }) => {
  const iconRef = useRef<HTMLButtonElement | null>(null) // Reference to the icon button
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  })
  const { open, onOpen, onClose } = useDisclosure()
  const { setCancelDrag } = useDragContext()

  const customListeners = {
    ...listeners,
    onPointerDown: (event: any) => {
      if (event.target.closest('[data-no-dnd="true"]')) {
        event.preventDefault()
        handleIconClick(event)
        return // 讓 IconButton 不觸發拖動
      }
      listeners?.onPointerDown?.(event)
    },
  }

  const handleIconClick = (e: React.MouseEvent) => {
    if (iconRef.current && iconRef.current.contains(e.target as Node)) {
      onOpen()
      setCancelDrag(true)
    }
  }

  const handleCloseDialog = () => {
    setCancelDrag(false)
    onClose()
  }

  return (
    <>
      <Box
        ref={setNodeRef}
        {...attributes}
        {...customListeners}
        className="show-border"
        py="2px"
        px="10px 2px"
        display="flex"
        flexDir="row"
        borderRadius="2xl"
        bgColor="white"
        transform={
          transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined
        }
        transition="transform 0.1s ease-out"
        zIndex="15"
        justifyContent="space-between"
        pointerEvents="auto" // ✅ 讓 Box 可以被點擊
      >
        <Text alignSelf="center">
          {item.text}
          {item?.estimatedStayTime && `(${item.estimatedStayTime}hr)`}
        </Text>

        <IconButton
          data-no-dnd="true"
          ref={iconRef}
          bgColor="white"
          size="md"
          aria-label="Search database"
          color="secondary.500"
          zIndex="15"
          pointerEvents="auto"
        >
          {/* <CiCircleInfo /> */}
          <CiSquareAlert />
        </IconButton>
      </Box>
      <DetailTripCard
        itemInfo={item}
        isOpen={open}
        onConfirm={handleCloseDialog}
        onClose={handleCloseDialog}
      />
    </>
  )
}
