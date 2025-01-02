import { FieldValues, Path } from 'react-hook-form'

export interface BaseFormStepField<TFieldValues extends FieldValues> {
  fieldKey: string
  fieldInfo: FieldInfo<TFieldValues>
}

export interface FieldInfo<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  label: string
  rules: any
  isRequired: boolean
}
