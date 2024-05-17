import { FC, useState } from 'react'

function ConceptDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <li>
          相同位置的不同元件，會使 state 重置
          <br></br>
          <span className="ml-8">每當點擊 + 1 時， input 輸入的文字會消失</span>
          <div>
            <MyResetComponent></MyResetComponent>
          </div>
        </li>
      </div>
      <div>
        <li>
          在相同位置重置 state
          <br></br>
          <span className="ml-8">
            React 會在一個元件保持在同一位置時保留 state。
          </span>
          <div></div>
        </li>
      </div>
    </div>
  )
}

export default ConceptDemo

export function MyResetComponent() {
  const [counter, setCounter] = useState(0)

  function MyTextField() {
    const [text, setText] = useState('')

    return (
      <input
        className="border-2 border-black border-solid"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    )
  }

  return (
    <>
      <MyTextField />
      <button
        className="ml-4 border-2 border-blue-200 border-solid rounded-lg bg-blue-200"
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        點擊了 {counter} 次
      </button>
    </>
  )
}

export function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {isPlayerA ? <Counter person="Taylor" /> : <Counter person="Sarah" />}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        下一位玩家！
      </button>
    </div>
  )
}

const Counter: FC<{ person: string }> = ({ person }) => {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(false)

  let className = 'counter'
  if (hover) {
    className += ' hover'
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person} 的分数：{score}
      </h1>
      <button onClick={() => setScore(score + 1)}>加一</button>
    </div>
  )
}
export { Counter }
