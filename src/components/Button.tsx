import { FC, PropsWithChildren, ReactNode } from 'react'
import FaIcon from './icons/FaIcon'
import { FaIconProps } from './icons/icon.vo'

export interface ButtonProps {
  style?: React.CSSProperties
  prefixIcon?: FaIconProps
  suffixIcon?: FaIconProps
  className?: string
  onClick?: (props: any) => void
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({
  style,
  prefixIcon,
  suffixIcon,
  className,
  onClick,
  children,
}) => {
  return (
    <button style={style} className={className} onClick={onClick}>
      {prefixIcon && <FaIcon {...prefixIcon}></FaIcon>}
      {children}
      {suffixIcon && <FaIcon {...prefixIcon}></FaIcon>}
    </button>
  )
}

export default Button
