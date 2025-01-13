import { useFormContext } from 'react-hook-form'
import CircleButton from '../../../components/buttons/CircleButton'
import FormInput from '../../../components/formInput/FormInput'
import { ChakraIcons } from '../../../utils/icons-utils'
import { GroupInfo } from '../FormUseFieldArraySamplePage'

interface Props {
  index: number
  addOne: (index: number) => void
  deleteOne: (index: number) => void
  resetOne: (index: number) => void
}
const CartoonCharacterInfo: React.FC<Props> = ({
  index,
  addOne,
  deleteOne,
  resetOne,
}) => {
  const { setValue, getValues, trigger } = useFormContext<GroupInfo>()
  const handleSubFormAdd = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault()
    // 手動觸發驗證
    const isValid = await trigger([
      `members.${index}.name`,
      `members.${index}.age`,
      `members.${index}.gender`,
    ])

    if (!isValid) {
      console.log('表單驗證失敗')
      return
    }

    // 更新父表單值
    const value = getValues(`members.${index}`)
    setValue(`members.${index}`, value)
    // 再新增一筆
    addOne(index)
  }

  const handleSubFormDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault()
    // 更新父表單值
    const value = getValues(`members.${index}`)
    setValue(`members.${index}`, value)
    // 檢查是否為第0筆
    if (index !== 0) {
      // 刪除一筆
      deleteOne(index)
    } else {
      resetOne(index)
    }
  }
  return (
    <>
      <fieldset>
        <FormInput<GroupInfo>
          name={`members.${index}.name`}
          isRequired={true}
          label="人物名稱"
          rules={{ required: '請輸入人物名稱' }}
        />
        <FormInput<GroupInfo>
          name={`members.${index}.age`}
          isRequired={true}
          label="年齡"
          rules={{ required: '請輸入年齡' }}
        />
        <FormInput<GroupInfo>
          name={`members.${index}.gender`}
          isRequired={true}
          label="人物性別"
          rules={{ required: '請輸入物理性別' }}
        />
        <CircleButton
          mr={2}
          icon={ChakraIcons.Add}
          type="submit"
          onClick={(event) => handleSubFormAdd(event, index)}
        ></CircleButton>
        <CircleButton
          color="red.500"
          icon={ChakraIcons.Delete}
          type="button"
          onClick={(event) => handleSubFormDelete(event, index)}
        ></CircleButton>
      </fieldset>
    </>
  )
}

export default CartoonCharacterInfo
