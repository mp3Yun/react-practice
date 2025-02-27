import {
  Box,
  Grid,
  GridItem,
  Span,
  Text,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from '@chakra-ui/react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import CircleWithText from '../../../../components/circle/CircleWithText'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import SortableItem from '../../../../components/dragDrop/SortableItem'
import { EmptyCard } from './EmptyCard'
import TimeOccupiedCard from './TimeOccupiedCard'
import { TripCard } from './TripCard'
import Watermark from '../../../../components/watermark/Watermark'

interface Props<T extends ItemInfo> {
  dayKey: string
  data: T[]
}

const timeMarkers = ['08', '12', '16', '20']
const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 8
  return `${hour}:00 - ${hour + 1}:00`
})

const getContextByTime = (time: string) => {
  let displayTimeText = ''
  if (time === '08') displayTimeText = '上午'
  if (time === '12') displayTimeText = '中午'
  if (time === '16') displayTimeText = '下午4點'
  if (time === '20') displayTimeText = '晚上8點'
  return `${displayTimeText}時段`
}

const DailySchedule = <T extends ItemInfo>({ dayKey, data }: Props<T>) => {
  let scheduleItems: ItemInfo[] = [...data]

  const { setNodeRef } = useDroppable({
    id: dayKey,
    data: {
      dropContext: dayKey,
    },
  })

  return (
    <div ref={setNodeRef}>
      <TimelineRoot size="lg" variant="subtle" width="100%">
        {timeMarkers.map((marker, index) => (
          <TimelineItem key={index}>
            <TimelineConnector
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <CircleWithText size="s" text={marker} />
              <Box flex="1" w="2px" bg="gray.200"></Box>
            </TimelineConnector>
            <TimelineContent>
              <Watermark
                text={dayKey}
                customW={90}
                customH={50}
                opacity={0.1}
              />
              <TimelineTitle>
                <Span fontWeight="medium" h="1.5rem" alignSelf="center">
                  {getContextByTime(marker)}
                </Span>
              </TimelineTitle>

              <SortableContext items={data.map((e) => e.id)}>
                <Box position="relative" width="100%" height="18rem">
                  {/* 背景顯示時間區塊 */}
                  <Grid
                    templateColumns="repeat(1, 1fr)"
                    templateRows="repeat(4, 1fr)"
                    gap={0} // 不使用 gap 來讓格子緊貼
                    border="2px dashed var(--chakra-colors-gray-200)" // 外框虛線
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    zIndex="1"
                  >
                    {timeSlots
                      .slice(index * 4, (index + 1) * 4) // 只取當前區塊的 timeSlots
                      .map((slot, slotIndex) => (
                        <GridItem
                          key={slot}
                          gridRow={slotIndex + 1} // 確保每個 GridItem 在不同的行
                          gridColumn="1"
                          position="relative"
                          textAlign="center"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          w="auto"
                          h="auto"
                          borderBottom={
                            slotIndex === (index + 1) * 4 - 1
                              ? ''
                              : '2px dashed var(--chakra-colors-gray-200)'
                          } // 外框虛線
                        >
                          <Text fontSize="md" color="gray.500">
                            {slot}
                          </Text>
                        </GridItem>
                      ))}
                  </Grid>
                  {/* 前景顯示拖動區塊 */}
                  <Grid
                    templateColumns="repeat(1, 1fr)"
                    templateRows="repeat(4, 1fr)"
                    gap={0} // 不使用 gap 來讓格子緊貼
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    zIndex="10"
                  >
                    {scheduleItems.length > 0 &&
                      scheduleItems
                        .slice(index * 4, (index + 1) * 4)
                        .map((schedule, scheduleIndex) => {
                          return (
                            <GridItem
                              key={schedule.id}
                              gridRow={scheduleIndex + 1} // 確保每個 GridItem 在不同的行
                              gridColumn="1"
                              position="relative"
                              textAlign="center"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              w="auto"
                              h="auto"
                            >
                              <Box
                                px="0.5rem"
                                justifySelf="center"
                                alignContent="center"
                                w="100%"
                                h="100%"
                                zIndex="10"
                                key={schedule.id}
                                position="absolute"
                              >
                                <SortableItem
                                  key={schedule.id}
                                  item={schedule}
                                  dndType={dayKey}
                                  CustomComponent={
                                    !!schedule.text
                                      ? TripCard
                                      : schedule.id.includes('empty')
                                        ? EmptyCard
                                        : TimeOccupiedCard
                                  }
                                />
                              </Box>
                            </GridItem>
                          )
                        })}
                  </Grid>
                </Box>
              </SortableContext>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineRoot>
    </div>
  )
}

export default DailySchedule
