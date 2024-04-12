import { useState } from 'react'
import './App.css'
import Todo from './components/todos/Todo'
import TextBtn from './components/buttons/TextBtn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Todo />
      </div>
      <TextBtn text="純文字按鈕"></TextBtn>
    </>
  )
}

export default App
