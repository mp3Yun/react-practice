import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // TODO: add list item

  return (
    <>
      <div className="flex w-[100%] h-[100%]">
        <div className="flex-none w-[25%] h-auto border-solid border-2 border-current">
          列表的按鈕
          {/* TODO: 應該在這邊使用那個元件 */}
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
