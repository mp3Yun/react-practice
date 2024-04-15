import { useState } from 'react'
import './App.css'
import Todo from './components/todos/Todo'
import TextBtn from './components/buttons/TextBtn'
import IconBtn from './components/buttons/IconBtn'
import { IconDefinitions } from './icons/icon.definitions'
import IconTextBtn from './components/buttons/IconTextBtn'
import TextIconBtn from './components/buttons/TextIconBtn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Todo />
      </div>
      <TextBtn text="純文字按鈕"></TextBtn>
      <br></br>
      <IconBtn iconSrc={IconDefinitions.copy}></IconBtn>
      <br></br>
      <IconTextBtn
        iconSrc={IconDefinitions.faSearch}
        text="左 icon + 文字按鈕"
      ></IconTextBtn>
      <br />
      <TextIconBtn
        iconSrc={IconDefinitions.faPencil}
        text="右 icon + 文字按鈕"
      ></TextIconBtn>
      <br />
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Hello, Tailwind CSS!</h1>
      </div>
    </>
  )
}

export default App
