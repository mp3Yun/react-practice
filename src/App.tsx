import { useState } from 'react'
import './App.css'
import Todo from './components/todos/Todo'
import TextBtn from './components/buttons/TextBtn'
import IconBtn from './components/buttons/IconBtn'
import { IconDefinitions } from './components/icons/icon.definitions'
import IconTextBtn from './components/buttons/IconTextBtn'
import TextIconBtn from './components/buttons/TextIconBtn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import IconDemo from './components/demo/IconDemo'
import DemoHome from './components/demo/DemoHome'

function App() {
  const [count, setCount] = useState(0)

  const iconProps = {
    size: 'xs',
  }

  return (
    <>
      <TextBtn
        btnClassName="bg-blue-500 rounded-md pd-4"
        text="純文字按鈕"
      ></TextBtn>
      <br></br>
      <IconBtn
        iconSrc={IconDefinitions.copy}
        btnClassName="bg-blue-400 w-6 rounded-md"
      ></IconBtn>
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
      <br />
      <Router>
        <Routes>
          <Route path="/" element={<DemoHome />} />
          <Route path="/iconDemo" element={<IconDemo />} />
          <Route path="/buttonDemo" element={<IconDemo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
