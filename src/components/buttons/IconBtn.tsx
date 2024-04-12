import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinitions } from '../../icons/icon.definitions'

function IconBtn(props: BaseButton) {
  const icon = props.iconSrc || IconDefinitions.add
  return (
    <button>
      <FontAwesomeIcon icon={icon.src}></FontAwesomeIcon>
    </button>
  )
}

export default IconBtn
