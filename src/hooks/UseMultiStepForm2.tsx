import { useEffect, useRef, useState } from 'react'
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { useFormLeaveGuard } from './FormGuardContext'

interface MultiStepFormProps<TFieldValues extends readonly FieldValues[]> {
  currentStep: number
  formMethods: UseFormReturn<TFieldValues[number]>
  stepData: Partial<TFieldValues[number]>[]
  setStepData: (step: number, data: Partial<TFieldValues[number]>) => void
  resetStep: (step: number) => void
  resetAll: () => void
  isAnyFormDirty: boolean // 新增檢查是否有任何表單是髒的狀態
}

export interface StepProps<TFieldValues extends FieldValues> {
  defaultValues: TFieldValues
}
export function useMultiStepForm2<TFieldValues extends readonly FieldValues[]>(
  steps: StepProps<TFieldValues[number]>[],
  currentStep: number,
  onStepChange: (step: number) => void
): MultiStepFormProps<TFieldValues> {
  const [stepData, setStepDataState] = useState<
    Partial<TFieldValues[number]>[]
  >(steps.map((step) => step.defaultValues))

  // 為每個步驟創建獨立的 formMethods
  const formMethods = steps.map((step, index) =>
    useForm<TFieldValues[number]>({
      defaultValues: (stepData[index] || step.defaultValues) as DefaultValues<
        TFieldValues[number]
      >,
    })
  )

  const setStepData = (step: number, data: Partial<TFieldValues[number]>) => {
    setStepDataState((prev) => {
      const newData = [...prev]
      newData[step] = data
      return newData
    })
  }

  const resetStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      formMethods[step].reset(steps[step].defaultValues)
      setStepData(step, steps[step].defaultValues)
    }
  }

  const resetAll = () => {
    setStepDataState(steps.map((step) => step.defaultValues))
    formMethods.forEach((form, index) => {
      form.reset(steps[index].defaultValues, {
        keepDirty: false,
      })
    })
  }

  const isAnyFormDirty = formMethods.some((form) => {
    return form.formState.isDirty
  })

  // 離開表單時，檢查是否有未異動的資料
  const { setIsDirty } = useFormLeaveGuard()

  // 監控髒污狀態的變化並更新 useFormLeaveGuard
  const prevIsAnyFormDirty = useRef(isAnyFormDirty)
  useEffect(() => {
    if (isAnyFormDirty !== prevIsAnyFormDirty.current) {
      // 更新狀態
      setIsDirty(isAnyFormDirty)
    }

    // 更新 ref 的值
    prevIsAnyFormDirty.current = isAnyFormDirty
  }, [isAnyFormDirty, setIsDirty])

  return {
    currentStep,
    formMethods: formMethods[currentStep],
    stepData,
    setStepData,
    resetStep,
    resetAll,
    isAnyFormDirty,
  }
}
