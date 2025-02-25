import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import { GrAdd, GrClose } from 'react-icons/gr'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import DailySchedule from './DailySchedule'

interface Props {
  scheduleDays: Record<string, ItemInfo[]>
  updateDaySchedules: (currentDayKey: string, scheduleDays: ItemInfo[]) => void
  activeDayKey: string
  setDayKey: (dayKey: string) => void
  handleAddDay: () => void
  handleCloseDay: (dayKey: string) => void
}
const ConfirmedSchedules: React.FC<Props> = ({
  scheduleDays,
  updateDaySchedules,
  activeDayKey,
  setDayKey,
  handleAddDay,
  handleCloseDay,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: 'confirmed-schedules' }) // TODO: 這個應該可以拔掉
  const handleClose = (dayKey: string) => {
    // 取得那個dayKey
    console.log('99-dayKey=>', dayKey)
    handleCloseDay(dayKey)
  }

  // const handleSubDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event

  //   // Check if items are dropped in a different context
  //   if (active.id !== over?.id) {
  //     // Find the source and target schedules
  //     const sourceDayKey = active.data?.current?.dropContext
  //     const targetDayKey = over?.data?.current?.dropContext

  //     if (sourceDayKey && targetDayKey && sourceDayKey !== targetDayKey) {
  //       // Handle cross-context drag
  //       const sourceItems = schedules[sourceDayKey]
  //       const targetItems = schedules[targetDayKey]

  //       // Find the active item and its position
  //       const activeIndex = sourceItems.findIndex(
  //         (item) => item.id === active.id
  //       )
  //       const overIndex = targetItems.findIndex((item) => item.id === over?.id)

  //       // Move the item from the source context to the target context
  //       const movedItem = sourceItems[activeIndex]
  //       const updatedSourceItems = sourceItems.filter(
  //         (item) => item.id !== active.id
  //       )
  //       const updatedTargetItems = [
  //         ...targetItems.slice(0, overIndex),
  //         movedItem,
  //         ...targetItems.slice(overIndex),
  //       ]

  //       // Update the state with the new schedule
  //       setSchedules({
  //         ...schedules,
  //         [sourceDayKey]: updatedSourceItems,
  //         [targetDayKey]: updatedTargetItems,
  //       })

  //       updateAllSchedules({
  //         ...schedules,
  //         [sourceDayKey]: updatedSourceItems,
  //         [targetDayKey]: updatedTargetItems,
  //       })
  //     }
  //   }
  // }

  return (
    <Box display="flex" flexDir="column">
      <Box
        className="show-border"
        padding="5px"
        display="flex"
        flexDir="row"
        width="100%"
        maxHeight="100%"
        borderRadius="2xl"
        overflowY="auto"
      >
        <Box
          margin="1rem"
          alignContent="center"
          minHeight="20vh"
          borderRight="2px solid var(--chakra-colors-gray-300)"
          fontSize="2xl"
        >
          <Text width="6vw" textAlign="center" justifySelf="center">
            行程
          </Text>
        </Box>

        <Box
          width="75vw"
          display="flex"
          flexDir="row"
          padding="0.5rem"
          gap="1rem"
          justifyContent="start"
          maxHeight="52vh" // 讓內容區域有最大高度
          overflow="auto"
          whiteSpace="nowrap" // 防止內容換行，保證內容會超出並顯示滾動條
        >
          <VStack align="start">
            <Box display="flex" width="max-content">
              {Object.keys(scheduleDays).map((dayKey, index) => (
                <Button
                  key={dayKey}
                  onClick={() => setDayKey(dayKey)}
                  width="25vw"
                  variant={activeDayKey === dayKey ? 'solid' : 'outline'}
                  color={
                    activeDayKey === dayKey ? 'primary.500' : 'primary.300'
                  }
                  bgColor={
                    activeDayKey === dayKey ? 'primary.100' : 'primary.50'
                  }
                >
                  <Flex justify="space-between" align="center" width="100%">
                    <Box></Box>
                    <Box>{dayKey}</Box>
                    {index !== 0 ? (
                      <Box
                        onClick={(e) => {
                          e.stopPropagation() // 防止點擊影響父層按鈕
                          handleClose(dayKey)
                        }}
                      >
                        <GrClose />
                      </Box>
                    ) : (
                      <Box></Box>
                    )}
                  </Flex>
                </Button>
              ))}
              <Button
                variant="solid"
                color="primary.300"
                bgColor="primary.50"
                onClick={handleAddDay}
              >
                <GrAdd />
              </Button>
            </Box>

            {/* Tab Panels - All content is visible */}

            <Box display="flex" width="100%" mt="2" ref={setNodeRef}>
              {Object.entries(scheduleDays).map(([key, value]) => (
                <Box
                  id={key}
                  key={key}
                  width="25vw"
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={
                    activeDayKey === key ? 'primary.300' : 'primary.50'
                  }
                >
                  <DailySchedule
                    {...attributes}
                    {...listeners}
                    dayKey={key}
                    data={value}
                    updateDaySchedules={updateDaySchedules}
                  ></DailySchedule>
                </Box>
              ))}
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}

export default ConfirmedSchedules
