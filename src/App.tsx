import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { BaseButton } from './components/buttons/button.vo'
import { IconDefinitions } from './components/icons/icon.definitions'
import BaseItem from './components/listItems/BaseItem'

function App() {
  const [count, setCount] = useState(0)

  // TODO: add list item
  const listItems: BaseButton[] = [
    {
      id: 1,
      type: 'TextBtn',
      text: 'Icon Demo Page',
    },
    {
      id: 2,
      type: 'IconTextBtn',
      text: 'TEST Icon Demo 111',
      iconSrc: IconDefinitions.faSearch,
    },
    {
      id: 3,
      type: 'TextIconBtn',
      text: 'TEST Icon Demo 222',
      iconSrc: IconDefinitions.faPencil,
    },
  ]

  return (
    <>
      <div className="flex w-[100%] h-[100%]">
        <div className="flex-none w-[25%] h-auto border-solid border-2 border-current">
          列表的按鈕
          {/* { listItems.map((item) => (
						<div key={item.id}>
							<BaseItem item></BaseItem>
						</div>
					))} */}
        </div>
        <div className="flex-initial w-[75%] h-auto">
          <div className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl font-bold">Hello, here is Title !</h1>
          </div>
          <div>
            outlet:
            <div>
              <Outlet />
            </div>
            ---
          </div>
        </div>
      </div>
    </>
  )
}

export default App
