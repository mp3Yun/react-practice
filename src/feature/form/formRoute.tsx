import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

export const formRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/form', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Form].component, // 定義該路由的對應組件
})

export const formCustomInputRoute = createRoute({
  getParentRoute: () => formRoute,
  path: '/customInput', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.FormCustomInput].component, // 定義該路由的對應組件
})

export const formUseFieldArrayRoute = createRoute({
  getParentRoute: () => formRoute,
  path: '/useFieldArray', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.FormUseFieldArray].component, // 定義該路由的對應組件
})

export const formStepsRoute = createRoute({
  getParentRoute: () => formRoute,
  path: '/steps', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.FormSteps].component, // 定義該路由的對應組件
})

export const formTreeRoute = formRoute.addChildren([
  formCustomInputRoute,
  formUseFieldArrayRoute,
  formStepsRoute,
])
