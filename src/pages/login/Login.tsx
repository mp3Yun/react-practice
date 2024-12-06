import Button from '../../components/Button'
import Card from '../../components/Card'

function Login() {
  return (
    <div className="w-screen h-screen content-center ">
      {/* TODO: 置中怎麼了 */}
      <div className="h-64 w-64 flex border-2 border-solid border-stone-600 p-8">
        <Card>
          <div className="h-12">帳號</div>
          <div className="h-12">密碼</div>
          <div className="h-12">
            {/* 登入按鈕 */}
            <Button className="flex-initial w-20 h-auto">登入按鈕</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login
