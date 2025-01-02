// useStepForm.ts
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form'

export interface UseStepFormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>
  onSubmit: SubmitHandler<T>
}

export function useStepForm<T extends FieldValues>({
  defaultValues,
  onSubmit,
}: UseStepFormProps<T>): UseFormReturn<T> & { handleSubmit: () => void } {
  const methods = useForm<T>({ defaultValues })

  const handleSubmit = () => methods.handleSubmit(onSubmit)

  return {
    ...methods,
    handleSubmit,
  }
}
