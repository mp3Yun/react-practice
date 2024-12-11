import { createRootRoute, Outlet } from '@tanstack/react-router'
import NotFoundPage from '../feature/NotFoundPage'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* 路由 debug 小工具 */}
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFoundPage,
})
