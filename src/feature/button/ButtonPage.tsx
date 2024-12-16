import { Button, Flex } from '@chakra-ui/react'
import { Link, Outlet, useNavigate, useRouter } from '@tanstack/react-router'
import { RoutePathEnum } from '../../dto/route-paths'
import NestedComponent from '../../components/NestedComponent'

const ButtonPage: React.FC = () => {
  // 路由轉跳使用-法1
  const router = useRouter()
  // 路由轉跳使用-法3
  const navigate = useNavigate()
  const handleSample3Click = () => {
    navigate({
      to: RoutePathEnum.ButtonId,
      params: { postId: '3' },
      // search 有資料
      search: { searchId: '3', extraParams: 'test' },
    })
  }
  return (
    <div>
      <NestedComponent title="Button 功用">
        <Flex direction={'row'} gap={4}>
          <Button>
            {/* 路由轉跳使用-法2 Link */}
            <Link to={RoutePathEnum.ButtonId} params={{ postId: '1' }}>
              點擊移動範例
            </Link>
          </Button>
          <Button>
            <Link to={RoutePathEnum.ButtonId} params={{ postId: '2' }}>
              上下拖動範例
            </Link>
          </Button>

          {/* 路由轉跳使用-法3 useNavigate */}
          <Button onClick={handleSample3Click}>Post 789</Button>

          {/* 路由轉跳使用-法1 useRouter */}
          <Button
            onClick={() => {
              router.navigate({
                to: RoutePathEnum.ButtonDetail,
              })
            }}
          >
            goto button detail
          </Button>
        </Flex>
        <NestedComponent title="Button 明細頁">
          <Outlet />
        </NestedComponent>
      </NestedComponent>
    </div>
  )
}

export default ButtonPage
