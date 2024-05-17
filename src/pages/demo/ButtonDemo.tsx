import { CardIconButton } from '../../components/Button'
import { IconDefinitions } from '../../components/icons/icon.definitions'

function ButtonDemo() {
  return (
    <div>
      button demo page<br></br>
      <CardIconButton
        size={'xs'}
        prefixIcon={{ iconSrc: IconDefinitions.faPencil }}
      >
        xs 按鈕
      </CardIconButton>
      <CardIconButton
        size={'sm'}
        prefixIcon={{ iconSrc: IconDefinitions.faPencil }}
      >
        sm 按鈕
      </CardIconButton>
      <CardIconButton
        size={'md'}
        prefixIcon={{ iconSrc: IconDefinitions.faPencil }}
      >
        md 按鈕
      </CardIconButton>
      <CardIconButton
        size={'lg'}
        prefixIcon={{ iconSrc: IconDefinitions.faPencil }}
      >
        lg 按鈕
      </CardIconButton>
    </div>
  )
}

export default ButtonDemo
