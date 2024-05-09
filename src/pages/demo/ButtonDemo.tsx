import { CardIconButton } from '../../components/Button'
import { IconDefinitions } from '../../components/icons/icon.definitions'
import { FaIconProps } from '../../components/icons/icon.vo'

function ButtonDemo() {
  return (
    <div>
      button demo page<br></br>
      <CardIconButton
        size={'xs'}
        prefixIcon={IconDefinitions.faPencil as FaIconProps}
      >
        xs 按鈕
      </CardIconButton>
      <CardIconButton
        size={'sm'}
        prefixIcon={IconDefinitions.faPencil as FaIconProps}
      >
        sm 按鈕
      </CardIconButton>
    </div>
  )
}

export default ButtonDemo
