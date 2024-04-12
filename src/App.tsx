import { useState } from 'react'
import './App.css'
import Todo from './components/todos/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Todo />
      </div>
      <Todo />
    </>
  )
}

export default App
