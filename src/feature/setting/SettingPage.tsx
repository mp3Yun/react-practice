import { Box, Text } from '@chakra-ui/react'
import AutoCompleteSelect from '../../components/selects/AutoCompleteSelect'
import AutoCompleteSelect2 from '../../components/selects/AutoCompleteSelect2'
import { useForm } from 'react-hook-form'

interface FormValues {
  language: string
}

const SettingPage: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      language: '', // 預設值為空
    },
  })

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
      <Box height="fit-content">
        <Text> AutoCompleteSelect test 1</Text>
        <AutoCompleteSelect options={options}></AutoCompleteSelect>
      </Box>

      <Box>
        <Text> AutoCompleteSelect2 combind with react-hook-form</Text>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <AutoCompleteSelect2<(typeof options)[0], FormValues>
            options={options}
            formInputProps={{
              control,
              name: 'language',
              inputProps: { placeholder: 'Search with react-hook-form' },
            }}
          ></AutoCompleteSelect2>
        </form>
      </Box>
    </Box>
  )
}

export default SettingPage
