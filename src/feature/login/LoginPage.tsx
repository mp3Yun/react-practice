import { Button } from '@chakra-ui/react'
import { Outlet, useRouter } from '@tanstack/react-router'

const LoginPage: React.FC = () => {
  const router = useRouter() // TODO: 我的路由，在拉成 service???
  return (
    <div>
      登入頁面
      <Button
        onClick={() => {
          router.navigate({
            to: '/home',
          })
        }}
      >
        登入
      </Button>
    </div>
  )
}

export default LoginPage
