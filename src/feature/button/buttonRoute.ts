import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import ButtonPage from './ButtonPage'

// 創建路由
export const buttonRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/button', // 定義路由的 path
  component: ButtonPage, // 定義該路由的對應組件
})
