import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router'
import { homeRouteTree } from '../feature/home/homeRoute'
import { loginRoute } from '../feature/login/loginRoute'

export const rootRoute = createRootRoute({
  component: Outlet,
})

// 建立路由樹
const routeTree = rootRoute.addChildren([loginRoute, homeRouteTree])

const router = createRouter({ routeTree })

export { router, routeTree }
