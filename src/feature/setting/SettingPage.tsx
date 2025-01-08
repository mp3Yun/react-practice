import { Box, Text } from '@chakra-ui/react'
import AutoCompleteSelect from '../../components/selects/AutoCompleteSelect'

const SettingPage: React.FC = () => {
  const options = [
    { value: '1', label: 'Option 1 December 25th' },
    { value: '2', label: 'Option 2 Loser' },
    { value: '3', label: 'Option 3 Fate' },
    { value: '4', label: 'Option 4 One Night' },
    { value: '5', label: 'Option 5 The Race' },
  ]
  return (
    <Box>
      <Text>Setting Page</Text>
      <AutoCompleteSelect options={options}></AutoCompleteSelect>
    </Box>
  )
}

export default SettingPage
