import { Box, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import AutoCompleteSelect from '../../components/selects/AutoCompleteSelect'
import AutoCompleteSelect2 from '../../components/selects/AutoCompleteSelect2'
import { BaseOption } from '../../hooks/UseAutoComplete'
import MultipleSelect from '../../components/selects/MultipleSelect'
import MultipleSelect2 from '../../components/selects/MultipleSelect2'

interface FormValues {
  language: string
}

interface FormValues2 {
  language: string
}

interface FormValues3 {
  fruits: BaseOption[]
}
const SettingPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      language: '', // 預設值為空
    },
  })

  const { control: control2 } = useForm<FormValues2>({
    defaultValues: {
      language: '', // 預設值為空
    },
  })

  const {
    control: control3,
    watch,
    handleSubmit: handleSubmit3,
    setValue, // 用來更新表單值
  } = useForm<FormValues3>({
    defaultValues: {
      fruits: [], // 預設值為空
    },
  })

  const options = [
    { value: 'en', label: 'english' },
    { value: 'zh-TW', label: 'traditionalChinese' },
    { value: 'zh-CN', label: 'simplifiedChinese' },
    { value: 'ja', label: 'japanese' },
  ]

  const fruitsOptions: BaseOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'grape', label: 'Grape' },
  ]

  const onSubmit3 = (data: FormValues3) => {
    console.log('Form Submitted:', data)
    // post api
  }

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  return (
    <Box width="90%" h="90vh" bg="gray.100" bgColor="white">
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

      <Box>
        <Text> AutoCompleteMultipleSelect</Text>
        <MultipleSelect<(typeof fruitsOptions)[0], FormValues3>
          options={fruitsOptions}
          formInputProps={{
            control: control3,
            name: 'fruits',
            inputProps: { placeholder: 'pick your favorite fruits' },
          }}
          onChange={(values) => {
            const selectFruit = fruitsOptions.filter((option) =>
              values.includes(option.value)
            ) as BaseOption[]
            setValue('fruits', [...selectFruit])
            handleSubmit3(onSubmit3)()
          }}
        ></MultipleSelect>
      </Box>

      <Box>
        <Text> AutoCompleteMultipleSelect</Text>
        <MultipleSelect2<(typeof fruitsOptions)[0], FormValues3>
          options={fruitsOptions}
          formInputProps={{
            control: control3,
            name: 'fruits',
            inputProps: { placeholder: 'pick your favorite fruits' },
          }}
          onChange={(values) => {
            const selectFruit = fruitsOptions.filter((option) =>
              values.includes(option.value)
            ) as BaseOption[]
            setValue('fruits', [...selectFruit])
            handleSubmit3(onSubmit3)()
          }}
        ></MultipleSelect2>
      </Box>

      <Box className="show-border" padding={4}>
        <Text fontSize="xl">{t('settingLanguage')}</Text>
        <form>
          <AutoCompleteSelect2<(typeof options)[0], FormValues2>
            options={options}
            formInputProps={{
              control: control2,
              name: 'language',
              inputProps: { placeholder: t('plzChooseLanguage') },
            }}
            onChange={(value) => {
              // 手動更新選擇的值並觸發表單提交
              switchLanguage(value || 'zh-TW')
            }}
            isShowCheck={true}
            useAsButton={true}
          ></AutoCompleteSelect2>
        </form>
      </Box>
    </Box>
  )
}

export default SettingPage
