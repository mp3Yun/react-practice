import { FieldValues, UseFormReturn } from 'react-hook-form'
import FormInput from './FormInput'
import { BaseFormStepField } from '../../feature/form/class/BaseFormStepField'

const FormSection = <TFieldValues extends FieldValues>({
  formMethods,
  fields,
}: {
  formMethods: UseFormReturn<TFieldValues>
  fields: BaseFormStepField<TFieldValues>[]
}) => (
  <>
    {fields.map((item) => (
      <FormInput
        key={item.fieldKey}
        control={formMethods.control}
        name={item.fieldInfo.name}
        label={item.fieldInfo.label}
        rules={item.fieldInfo.rules}
        isRequired={item.fieldInfo.isRequired}
      />
    ))}
  </>
)

export default FormSection
