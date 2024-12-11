import { Button } from '@chakra-ui/react'
import { Outlet, useRouter } from '@tanstack/react-router'
import { RoutePathEnum } from '../../dto/route-paths'

const ButtonPage: React.FC = () => {
  const router = useRouter() // TODO: 我的路由，在拉成 service???
  return (
    <div>
      Button Page
      {/* 導到明細頁 */}
      <Button
        onClick={() => {
          router.navigate({
            to: RoutePathEnum.ButtonDetail,
          })
        }}
      >
        goto button detail
      </Button>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ButtonPage
