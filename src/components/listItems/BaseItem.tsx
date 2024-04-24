import IconBtn from '../buttons/IconBtn'
import IconTextBtn from '../buttons/IconTextBtn'
import TextBtn from '../buttons/TextBtn'
import TextIconBtn from '../buttons/TextIconBtn'
import { BaseButton } from '../buttons/button.vo'

function BaseItem(item: BaseButton) {
  // const setListItemView = () => {
  //   baseButtonItems.map((item) => {
  //     switch (item.type) {
  //       case 'IconBtn': {
  //         return (
  //           <IconBtn
  //             iconSrc={item.iconSrc}
  //             btnClassName={item.btnClassName}
  //             style={item.style}
  //           ></IconBtn>
  //         )
  //       }

  //       case 'TextBtn': {
  //         return (
  //           <TextBtn
  //             btnClassName={item.btnClassName}
  //             style={item.style}
  //           ></TextBtn>
  //         )
  //       }

  //       case 'IconTextBtn': {
  //         return (
  //           <IconTextBtn
  //             iconSrc={item.iconSrc}
  //             text={item.text}
  //             btnClassName={item.btnClassName}
  //             style={item.style}
  //           ></IconTextBtn>
  //         )
  //       }

  //       case 'TextIconBtn': {
  //         return (
  //           <TextIconBtn
  //             iconSrc={item.iconSrc}
  //             text={item.text}
  //             btnClassName={item.btnClassName}
  //             style={item.style}
  //           ></TextIconBtn>
  //         )
  //       }
  //     }
  //   })
  // }

  const setListItemView = () => {
    switch (item.type) {
      case 'IconBtn': {
        return (
          <IconBtn
            iconSrc={item.iconSrc}
            btnClassName={item.btnClassName}
            style={item.style}
          ></IconBtn>
        )
      }

      case 'TextBtn': {
        return (
          <TextBtn
            btnClassName={item.btnClassName}
            style={item.style}
          ></TextBtn>
        )
      }

      case 'IconTextBtn': {
        return (
          <IconTextBtn
            iconSrc={item.iconSrc}
            text={item.text}
            btnClassName={item.btnClassName}
            style={item.style}
          ></IconTextBtn>
        )
      }

      case 'TextIconBtn': {
        return (
          <TextIconBtn
            iconSrc={item.iconSrc}
            text={item.text}
            btnClassName={item.btnClassName}
            style={item.style}
          ></TextIconBtn>
        )
      }
    }
  }

  return
  ;<>{setListItemView()}</>
}

export default BaseItem
