import React from 'react'
import { ItemInfo } from '../../../../components/dragDrop/CrossZoneDragger'
import { Box, Tabs, Text } from '@chakra-ui/react'
import SingleDragBlock from '../../../../components/dragDrop/SingleDragBlock'
import { TripCard } from '../SchedulePage'

interface Props {
  scheduleDays: Record<string, ItemInfo[]>
}
const ConfirmedSchedules: React.FC<Props> = ({ scheduleDays }) => {
  return (
    <Box display="flex" flexDir="column">
      <Box
        className="show-border"
        padding="5px"
        display="flex"
        flexDir="row"
        width="100%"
        borderRadius="2xl"
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
          width="100%"
          display="flex"
          flexDir="row"
          padding="0.5rem"
          gap="0.5rem"
          justifyContent="start"
        >
          <Tabs.Root
            key="outline"
            defaultValue={Object.keys(scheduleDays)[0]}
            variant="outline"
            minWidth="20vw"
          >
            <Tabs.List>
              {Object.keys(scheduleDays).map((dayKey) => (
                <Tabs.Trigger key={dayKey} value={dayKey}>
                  <Text fontSize="xl">{dayKey}</Text>
                </Tabs.Trigger>
              ))}
              <Tabs.Indicator />
            </Tabs.List>
            {Object.entries(scheduleDays).map(([key, value]) => (
              <Tabs.Content key={key} value={key}>
                {/* 這個可能不適用 TODO: 因為我希望在自己內部的時候也可以拖動 */}
                <SingleDragBlock
                  data={value}
                  CustomComponent={TripCard}
                ></SingleDragBlock>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  )
}

export default ConfirmedSchedules
