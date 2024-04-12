import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinitions } from '../../icons/icon.definitions'

function TextIconBtn(props: BaseButton) {
  const icon = props.iconSrc || IconDefinitions.add
  return (
    <button>
      {props.text}
      <FontAwesomeIcon icon={icon.src}></FontAwesomeIcon>
    </button>
  )
}

export default TextIconBtn
