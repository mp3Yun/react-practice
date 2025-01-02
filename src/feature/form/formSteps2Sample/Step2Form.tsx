import { Box, Button } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormInput from '../../../components/formInput/FormInput'
import { BaseFormStepField } from '../class/BaseFormStepField'

export type FormStep2 = {
  address: { id: number; value: string }[]
  family: {
    member1: string
    member2: string
  }
  email: string
}
// 初始化表單二資料
export const step2FormData: FormStep2 = {
  address: [{ id: 1, value: '烏拉拉' }],
  family: {
    member1: '',
    member2: '',
  },
  email: '',
}

const Step1Form: React.FC = () => {
  const formMethods = useFormContext<FormStep2>()
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'address', // 地址對應的陣列名稱
  })

  return (
    <Box>
      <h3>Step 2</h3>
      <form name="step2">
        <Box my={2}>
          {fields.map((field, index) => (
            <Box key={field.id}>
              <FormInput<FormStep2>
                control={formMethods.control}
                name={`address.${index}.value`}
                label={`地址 ${index + 1}`}
                isRequired={true}
                rules={{ required: '請輸入地址' }}
              />
              <Button onClick={() => remove(index)} colorScheme="red" size="sm">
                刪除
              </Button>
            </Box>
          ))}

          <Button
            onClick={() => append({ id: fields.length, value: '' })} // 新增一個空地址
            colorScheme="blue"
            size="sm"
            mt={4}
          >
            新增地址
          </Button>
        </Box>

        <FormInput<FormStep2>
          control={formMethods.control}
          name="family.member1"
          isRequired={true}
          label="家人1"
          rules={{ required: '請輸入家人1' }}
        ></FormInput>
        <FormInput<FormStep2>
          control={formMethods.control}
          name="family.member2"
          isRequired={true}
          label="家人2"
          rules={{ required: '請輸入家人2' }}
        ></FormInput>
        <FormInput<FormStep2>
          control={formMethods.control}
          name="email"
          isRequired={true}
          label="信箱"
          rules={{ required: '請輸入信箱' }}
        ></FormInput>
      </form>
    </Box>
  )
}

export default Step1Form
