import FaIcon from '../icons/FaIcon'
import { IconDefinitions } from '../icons/icon.definitions'
import { BaseButton } from './button.vo'

function IconTextBtn(props: BaseButton) {
  const icon = props?.iconSrc || IconDefinitions.add
  const iconProps = props.iconProps
  return (
    <button
      style={props.style}
      className={props.btnClassName}
      onClick={props.onBtnClick}
    >
      <FaIcon
        iconSrc={icon}
        size={iconProps?.size}
        rotation={iconProps?.rotation}
        flip={iconProps?.flip}
      ></FaIcon>
      {props.text}
    </button>
  )
}

export default IconTextBtn
