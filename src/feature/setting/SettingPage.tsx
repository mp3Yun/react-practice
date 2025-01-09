import { Box, Text } from '@chakra-ui/react'
import AutoCompleteSelect from '../../components/selects/AutoCompleteSelect'
import AutoCompleteSelect2 from '../../components/selects/AutoCompleteSelect2'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'

interface FormValues {
  language: string
}

interface FormValues2 {
  language: string
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

  const options = [
    { value: 'en', label: 'english' },
    { value: 'zh-TW', label: 'traditionalChinese' },
    { value: 'zh-CN', label: 'simplifiedChinese' },
    { value: 'ja', label: 'japanese' },
  ]

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
          ></AutoCompleteSelect2>
        </form>
      </Box>
    </Box>
  )
}

export default SettingPage
