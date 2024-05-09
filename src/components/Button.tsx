import { FC, ReactNode } from 'react'
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
      {suffixIcon && <FaIcon {...suffixIcon}></FaIcon>}
    </button>
  )
}

export default Button

export interface CardButtonProps extends ButtonProps {
  size: 'xs' | 'sm' | 'md' | 'lg'
}

const CardIconButton: FC<CardButtonProps> = ({
  size,
  style,
  prefixIcon,
  suffixIcon,
  className,
  onClick,
  children,
}) => {
  let cardClassName = className

  if (size) {
    cardClassName =
      'font-medium bg-sky-100 border-dash border-4 border-sky-600 '
    switch (size) {
      case 'xs':
        cardClassName = cardClassName + ' w-24 h-24 rounded-sm '
        break
      case 'sm':
        cardClassName = cardClassName + ' w-28 h-28 rounded '
        break
      case 'md':
        cardClassName = cardClassName + ' w-32 h-32 rounded-md '
        break
      case 'lg':
        cardClassName = cardClassName + ' w-36 h-36 rounded-lg '
        break
    }
  }

  return (
    <Button
      style={style}
      className={cardClassName}
      prefixIcon={{ ...prefixIcon, size: size }}
      suffixIcon={{ ...suffixIcon, size: size }}
      onClick={onClick}
    >
      <br></br>
      {children}
    </Button>
  )
}

export { Button, CardIconButton }
