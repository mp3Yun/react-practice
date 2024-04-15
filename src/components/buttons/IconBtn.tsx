import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinitions } from '../../icons/icon.definitions'
import { BaseButton } from './button.vo'

function IconBtn(props: BaseButton) {
  const icon = props.iconSrc || IconDefinitions.add
  const iconProps = props.iconProps
  return (
    <button style={props.style} className={props.btnClassName}>
      <FontAwesomeIcon
        icon={icon.src}
        size={iconProps?.size}
        rotation={iconProps?.rotation}
        flip={iconProps?.flip}
      ></FontAwesomeIcon>
    </button>
  )
}

export default IconBtn
