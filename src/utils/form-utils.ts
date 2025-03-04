import { FieldValues, UseFormReturn } from 'react-hook-form'

export const validateForm = async <T extends FieldValues>(
  methods: UseFormReturn<T>
): Promise<boolean> => {
  return new Promise((resolve) => {
    methods.handleSubmit(
      (data) => {
        // TODO:
        console.log('data', data)
        resolve(true) // 驗證通過
      },
      () => {
        resolve(false) // 驗證失敗
      }
    )()
  })
}
