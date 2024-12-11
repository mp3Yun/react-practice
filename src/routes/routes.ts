import { createRouter } from '@tanstack/react-router'
import { homeRouteTree } from '../feature/home/homeRoute'
import { loginRoute } from '../feature/login/loginRoute'
import { Route } from './__root'

// 建立路由樹
const routeTree = Route.addChildren([loginRoute, homeRouteTree])

const router = createRouter({ routeTree })

export { router, routeTree }
