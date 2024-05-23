import { FC, useState } from 'react'
import './ConceptDemo.scss'

function ConceptDemo() {
  return (
    <div className="flex flex-col gap-3 items-start text-left">
      {/* case 1 */}
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

      {/* case 2 */}
      <div className="">
        <li>
          在相同位置重置 state
          <br></br>
          <span className="ml-8">
            React 會在一個元件保持在同一位置時保留 state。<br></br>
            目前當你切換玩家時，分數會被保留下來。這兩個 Counter
            出現在相同的位置，所以 React 會認為它們是 同一個
            Counter，只是傳了一個不同的 person prop。
          </span>
          <div className="flex items-center content-center">
            <Scoreboard></Scoreboard>
          </div>
        </li>
      </div>

      {/* case 3 */}
      <div>
        <li>
          延伸上述題，該記分板應該要是被重新渲染的，但因為在渲染樹上相同位置，而導致
          state 未被重置， 被重置的做法如下:
          <li className="list-decimal">
            將元件渲染在不同位置
            <div>
              <ScoreboardSetByDiffPosition></ScoreboardSetByDiffPosition>
            </div>
          </li>
          <li className="list-decimal">
            使用 key 賦予每個元件一個明確身分 <br />
            *使用 Key 來重置 state ，在處理表單時特别有用
            <div>
              <ScoreboardSetByKey></ScoreboardSetByKey>
            </div>
          </li>
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
        className="border-2 border-blue-200 border-solid rounded-lg bg-blue-200"
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        下一位玩家！
      </button>
    </div>
  )
}

export function ScoreboardSetByDiffPosition() {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {isPlayerA && <Counter person="Taylor" />}
      {!isPlayerA && <Counter person="Sarah" />}
      <button
        className="border-2 border-blue-200 border-solid rounded-lg bg-blue-200"
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        下一位玩家！
      </button>
    </div>
  )
}

export function ScoreboardSetByKey() {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button
        className="border-2 border-blue-200 border-solid rounded-lg bg-blue-200"
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        下一位玩家！
      </button>
    </div>
  )
}

// 注意型別的宣告
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
      <button
        className="border-2 border-blue-200 border-solid rounded-lg bg-blue-200"
        onClick={() => setScore(score + 1)}
      >
        加一
      </button>
    </div>
  )
}
export { Counter }
