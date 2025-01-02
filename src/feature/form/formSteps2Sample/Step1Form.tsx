import { useFormContext } from 'react-hook-form'
import FormSection from '../../../components/formInput/FormSection'
import { BaseFormStepField } from '../class/BaseFormStepField'

// 初始化表單一資料
export const step1FormData = {
  name: '',
  gender: '',
  age: '',
  telephone: '',
}

export type FormStep1 = typeof step1FormData

// 使用 `typeof` 和映射類型來定義鍵與 `BaseFormStepField` 的關聯
export type Step1FormFieldMapping = {
  [K in keyof FormStep1]: BaseFormStepField<FormStep1>
}

// 定義表單規則
const step1FieldMapping: Step1FormFieldMapping = {
  name: {
    fieldKey: 'name',
    fieldInfo: {
      name: 'name',
      label: '姓名',
      rules: { required: '請輸入姓名' },
      isRequired: true,
    },
  },
  gender: {
    fieldKey: 'gender',
    fieldInfo: {
      name: 'gender',
      label: '性別',
      rules: { required: '請輸入性別' },
      isRequired: true,
    },
  },
  age: {
    fieldKey: 'age',
    fieldInfo: {
      name: 'age',
      label: '年齡',
      rules: { required: '請輸入年齡' },
      isRequired: true,
    },
  },
  telephone: {
    fieldKey: 'telephone',
    fieldInfo: {
      name: 'telephone',
      label: '電話',
      rules: { required: '請輸入電話' },
      isRequired: true,
    },
  },
}

// 將 Step1 的欄位對應轉換為 BaseFormStepField[]
const step1Fields: BaseFormStepField<FormStep1>[] =
  Object.values(step1FieldMapping)

const Step1Form: React.FC = () => {
  const formMethods = useFormContext<FormStep1>()

  return (
    <FormSection<FormStep1> formMethods={formMethods} fields={step1Fields} />
  )
}

export default Step1Form
