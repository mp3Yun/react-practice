import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinitions } from './icon.definitions'
import {
  FlipProp,
  RotateProp,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core'
import { FaIconProps } from './icon.vo'

function FaIcon(props: FaIconProps) {
  const icon = props.iconSrc || IconDefinitions.add
  const iconSize = props.size as SizeProp
  const iconRotation = props.rotation as RotateProp
  const iconFlip = props.flip as FlipProp

  return (
    <FontAwesomeIcon
      icon={icon.src}
      size={iconSize}
      rotation={iconRotation}
      flip={iconFlip}
    ></FontAwesomeIcon>
  )
}

export default FaIcon
