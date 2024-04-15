import { BaseButton } from './button.vo'

function TextBtn(props: BaseButton) {
  return (
    <button style={props.style} className={props.btnClassName}>
      {props.text}
    </button>
  )
}

export default TextBtn
