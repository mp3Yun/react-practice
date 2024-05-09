import { FC } from 'react'

const BottomPanel: FC<any> = ({ children }) => {
  return <div className="fixed w-auto h-auto">{children}</div>
}

export default BottomPanel
