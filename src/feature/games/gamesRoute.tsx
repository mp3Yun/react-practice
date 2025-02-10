import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

export const gamesRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/games', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Games].component, // 定義該路由的對應組件
})

export const ticTacToeRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: '/ticTacToe', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.TicTacToe].component, // 定義該路由的對應組件
})

export const memoryCardRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: '/memoryCard', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.MemoryCard].component, // 定義該路由的對應組件
})

export const whackAMoleRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: '/whackAMole', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.WhackAMole].component, // 定義該路由的對應組件
})

export const number2048Route = createRoute({
  getParentRoute: () => gamesRoute,
  path: '/number2048', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Number2048].component, // 定義該路由的對應組件
})

export const snakeGameRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: '/snakeGame', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.SnakeGame].component, // 定義該路由的對應組件
})

export const gamesRouteTree = gamesRoute.addChildren([
  ticTacToeRoute,
  memoryCardRoute,
  whackAMoleRoute,
  number2048Route,
  snakeGameRoute,
])
