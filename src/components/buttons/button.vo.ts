import {
  FlipProp,
  RotateProp,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core'

export interface BaseButton {
  text?: string
  iconSrc?: any
  iconProps?: IconProps
  style?: {
    [key: string]: any
  }
  btnClassName?: string
}

interface IconProps {
  size?: SizeProp
  rotation?: RotateProp
  flip?: FlipProp
}
