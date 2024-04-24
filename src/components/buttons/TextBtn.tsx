import { BaseButton } from './button.vo'

function TextBtn(props: BaseButton) {
  return (
    <button
      style={props.style}
      className={props.btnClassName}
      onClick={props.onBtnClick}
    >
      {props.text}
    </button>
  )
}

export default TextBtn
