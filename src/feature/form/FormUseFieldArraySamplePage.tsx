// ============ 表單中的陣列 sample ======== //

import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import FormInput from '../../components/formInput/FormInput'
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
  const groupFormMethods = useForm<GroupInfo>({
    defaultValues: {
      name: '名偵探柯南',
      leader: '江戶川柯南',
      target: '100萬美元的五稜星',
      members: [
        { id: 0, name: '江戶川柯南', age: 7, gender: '男' },
        { id: 1, name: '毛利小五郎', age: 43, gender: '男' },
      ],
    },
  })

  const { watch, control } = groupFormMethods

  // 每一列的資料
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'members',
  })

  const handleGroupFormSubmit = (data: GroupInfo) => {
    console.log('user form data', data)
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
                    <Tabs
                      variant="enclosed"
                      width="100%"
                      onChange={(index) => setTabIndex(index)}
                      index={tabIndex} // 控制選中的頁籤
                    >
                      <TabList>
                        {fields.map((field, index) => (
                          <Tab key={field.id}>
                            {watch(`members.${index}.name`) ||
                              `成員 ${index + 1}`}
                          </Tab>
                        ))}
                      </TabList>
                      <TabPanels width="100%">
                        {fields.map((field, index) => (
                          <TabPanel key={field.id} width="100%">
                            <CartoonCharacterInfo
                              index={index}
                              addOne={handleAddOne}
                              deleteOne={handleDeleteOne}
                              resetOne={handleDeleteOne}
                            />
                          </TabPanel>
                        ))}
                      </TabPanels>
                    </Tabs>
                  </Flex>
                </Box>
              </Flex>
              <Button type="submit">送出</Button>
            </form>
          </FormProvider>
        </Box>
      </Flex>
    </>
  )
}

export default SampleFormUseFieldArray
