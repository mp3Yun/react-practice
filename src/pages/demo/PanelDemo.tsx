import Button from '../../components/Button'
import BottomPanel from '../../components/panel/BottomPanel'

function PanelDemo() {
  function handleBtnOne() {
    alert('按鈕一被點擊')
  }

  function handleBtnTwo() {
    alert('按鈕二被點擊')
  }

  function handleBtnThree() {
    alert('按鈕三被點擊')
  }

  function handleBtnFour() {
    alert('按鈕四被點擊')
  }

  return (
    <div>
      panel demo page
      <br />
      <BottomPanel className="border-solid border-2 border-green-200">
        <div className="flex flex-row w-[100%] h-auto">
          <Button className="flex-initial w-20 h-auto" onClick={handleBtnOne}>
            按鈕一
          </Button>
          <Button className="flex-initial w-20 h-auto" onClick={handleBtnTwo}>
            按鈕二
          </Button>
        </div>
        <div className="flex flex-col">
          <Button onClick={handleBtnThree}>按鈕三</Button>
          <Button onClick={handleBtnFour}>按鈕四</Button>
        </div>
      </BottomPanel>
    </div>
  )
}

export default PanelDemo
