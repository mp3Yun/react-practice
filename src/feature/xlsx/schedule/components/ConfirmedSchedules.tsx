import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import { GrAdd, GrClose } from 'react-icons/gr'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import DailySchedule from './DailySchedule'

interface Props {
  scheduleDays: Record<string, ItemInfo[]>
  activeDayKey: string
  setDayKey: (dayKey: string) => void
  handleAddDay: () => void
  handleCloseDay: (dayKey: string) => void
}
const ConfirmedSchedules: React.FC<Props> = ({
  scheduleDays,
  activeDayKey,
  setDayKey,
  handleAddDay,
  handleCloseDay,
}) => {
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
                          handleCloseDay(dayKey)
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
            <Box display="flex" width="100%" mt="2">
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
                  <DailySchedule dayKey={key} data={value}></DailySchedule>
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
