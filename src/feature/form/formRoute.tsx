import { createRoute, RouteContext } from '@tanstack/react-router'
import { routePathMaps, RoutePathEnum } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

// Define a type for the context
interface NavigationContext {
  isDirty: boolean
  confirmLeave: () => Promise<boolean>
}

export const formRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/form', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Form].component, // 定義該路由的對應組件
})

export const formCustomInputRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/formCustomInput', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.FormCustomInput].component, // 定義該路由的對應組件
})

export const formUseFieldArrayRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/formUseFieldArray', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.FormUseFieldArray].component, // 定義該路由的對應組件
  // beforeLoad: ({ context }: { context: NavigationContext }) => {
  //   if (context.isDirty) {
  //     return context.confirmLeave()
  //   }
  // },
})

export const formTreeRoute = formRoute.addChildren([
  formCustomInputRoute,
  formUseFieldArrayRoute,
])
