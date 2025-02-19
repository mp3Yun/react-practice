import { Box, Button, VStack } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'

interface CustomTabProps {
  tabs: string[]
  activeTab: string
  children?: React.ReactNode
  handleAddTab: () => void
  setDayKey: (dayKey: string) => void
}

const CustomTabs: React.FC<CustomTabProps> = ({
  tabs,
  activeTab,
  children,
  handleAddTab,
  setDayKey,
}) => {
  return (
    <VStack align="start">
      {/* Tab List */}
      <Box display="flex" width="max-content">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onClick={() => setDayKey(tab)}
            width="25vw"
            variant={activeTab === tab ? 'solid' : 'outline'}
            colorScheme={activeTab === tab ? 'blue' : 'gray'}
          >
            {tab}
          </Button>
        ))}
        <Button variant="solid" colorScheme="blue" onClick={handleAddTab}>
          <GrAdd />
        </Button>
      </Box>

      {/* Tab Panels - All content is visible */}
      <Box display="flex" width="100%" mt={4}>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            width="25vw"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg={activeTab === tab ? 'blue.100' : 'transparent'}
          >
            {children}
          </Box>
        ))}
      </Box>
    </VStack>
  )
}

export default CustomTabs
