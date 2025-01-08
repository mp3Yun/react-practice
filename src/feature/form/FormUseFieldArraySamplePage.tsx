// ============ 表單中的陣列 sample ======== //

import { Box, Button, Flex, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import FormInput from '../../components/formInput/FormInput'
import { useFormLeaveGuard } from '../../hooks/FormGuardContext'
import CartoonCharacterInfo from './components/CartoonCharacterInfo'

export interface GroupInfo {
  name: string
  leader: string
  target: string
  members: Member[]
}

interface Member {
  id: number
  name: string
  age: number
  gender: string
}
const SampleFormUseFieldArray: React.FC = () => {
  const defaultValues: GroupInfo = {
    name: '名偵探柯南',
    leader: '江戶川柯南',
    target: '100萬美元的五稜星',
    members: [
      { id: 0, name: '江戶川柯南', age: 7, gender: '男' },
      { id: 1, name: '毛利小五郎', age: 43, gender: '男' },
    ],
  }

  const groupFormMethods = useForm<GroupInfo>({
    defaultValues: defaultValues,
  })

  const { watch, control, formState, reset } = groupFormMethods

  // 每一列的資料
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'members',
  })

  const { setIsDirty } = useFormLeaveGuard()

  const handleGroupFormSubmit = (data: GroupInfo) => {
    console.log('user form data', data)

    // not work -> useFieldArray 底下的狀態還是錯誤的
    // reset()

    // correct way
    reset(defaultValues)
  }

  const [tabIndex, setTabIndex] = useState(0)
  const handleAddOne = () => {
    const newMember = { id: fields.length, name: '', age: 0, gender: '' }
    append(newMember)
    // 聚焦到下一個頁籤
    setTabIndex(fields.length)
  }

  const handleDeleteOne = (index: number) => {
    // 聚焦到前一個頁籤
    if (index === 0) {
      update(0, { ...fields[0], name: '', age: 0, gender: '' })
      return
    }

    remove(index)
    setTabIndex(index - 1)
  }

  return (
    <>
      <Flex
        direction="column"
        align="flex-start"
        wrap="wrap"
        width={'80%'}
        gap={4}
      >
        <Box flex="1" width={'100%'}>
          <h2>各群組</h2>
        </Box>
        <Box
          flex="2"
          m="4"
          p="4"
          borderRadius="md"
          className="show-border"
          gap={2}
          width={'100%'}
        >
          <FormProvider {...groupFormMethods}>
            <Box>{watch('name')}</Box>
            <form
              // 檢查表單是否為 dirty
              onChange={() =>
                setIsDirty(Object.keys(formState.dirtyFields).length > 0)
              }
              onSubmit={groupFormMethods.handleSubmit(handleGroupFormSubmit)}
            >
              <Flex direction="row" width="100%">
                <Box flex="1">
                  <FormInput<GroupInfo>
                    name="name"
                    isRequired={true}
                    label="系列名稱"
                    rules={{ required: '請輸入群組系列' }}
                  />
                  <FormInput<GroupInfo>
                    name="leader"
                    isRequired={true}
                    label="C位"
                    rules={{ required: '請輸入C位角色' }}
                  />
                  <FormInput<GroupInfo>
                    name="target"
                    isRequired={false}
                    label="目標"
                  />
                  <Box p="4">人數: {watch('members').length}</Box>
                </Box>
                <Box flex="2" ml="4" className="show-border">
                  <Flex direction="row">
                    <Tabs.Root
                      key="line"
                      defaultValue={fields[0]?.id}
                      variant="line"
                    >
                      <Tabs.List>
                        {fields.map((field, index) => (
                          <Tabs.Trigger value={field.id}>
                            {watch(`members.${index}.name`) ||
                              `成員 ${index + 1}`}
                          </Tabs.Trigger>
                        ))}
                      </Tabs.List>

                      {fields.map((field, index) => (
                        <Tabs.Content value={field.id}>
                          <CartoonCharacterInfo
                            index={index}
                            addOne={handleAddOne}
                            deleteOne={handleDeleteOne}
                            resetOne={handleDeleteOne}
                          />
                        </Tabs.Content>
                      ))}
                    </Tabs.Root>
                  </Flex>
                </Box>
              </Flex>
              <Button type="submit">送出</Button>
            </form>
          </FormProvider>
        </Box>
      </Flex>

      <Flex mt={4}>{/* <MyForm></MyForm> */}</Flex>
    </>
  )
}

// 錯誤的範例
export default SampleFormUseFieldArray
// interface FormValues {
//   items: string[] // 預設為 string[] 類型 TODO: 注意: 不能夠為 string[], 一定要是 object[]
// }

// const MyForm = () => {
//   // 顯式定義 defaultValues 的類型
//   const { control, register, handleSubmit } = useForm<FormValues>({
//     defaultValues: {
//       items: ['預設資料'], // 預設為空陣列
//     },
//   })

//   // 顯式指定 'items' 的類型為 string[]
//   const { fields, append } = useFieldArray({
//     control,
//     name: 'items', // 設置 fieldArray 的 name
//   })

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log(data)
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {fields.map((item, index) => (
//         <div key={item.id}>
//           <input {...register(`items.${index}`)} defaultValue={item} />
//         </div>
//       ))}
//       <button type="button" onClick={() => append('')}>
//         新增項目
//       </button>
//       <button type="submit">提交</button>
//     </form>
//   )
// }
