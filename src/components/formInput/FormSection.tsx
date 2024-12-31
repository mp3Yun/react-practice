import { FieldValues } from 'react-hook-form'
import FormInput from './FormInput'

const FormSection = <TFieldValues extends FieldValues>({
  formMethods,
  fields,
}: {
  formMethods: any
  fields: { name: string; label: string; rules: any }[]
}) => (
  <>
    {fields.map((field) => (
      <FormInput
        key={field.name}
        control={formMethods.control}
        name={field.name}
        label={field.label}
        rules={field.rules}
        isRequired
      />
    ))}
  </>
)

export default FormSection
