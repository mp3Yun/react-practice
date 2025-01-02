import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { Route } from '../../routes/__root'
import { buttonRouteTree } from '../button/buttonRoute'
import { carouselRouteTree } from '../carousel/carouselRoute'
import { mainRoute } from '../main/mainRoute'
import { useCaseRouteTree } from '../use-case/useCaseRoute'
import { videoRoute } from '../video/videoRoute'
import {
  formCustomInputRoute,
  formRoute,
  formTreeRoute,
} from '../form/formRoute'
import { chartRoute } from '../chart/chartRoute'
import { tableRoute } from '../table/tableRoute'

// 創建路由
export const homeRoute = createRoute({
  getParentRoute: () => Route,
  path: RoutePathEnum.Home, // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Home].component, // 定義該路由的對應組件
})

// 建立路由樹
export const homeRouteTree = homeRoute.addChildren([
  // home 主頁面
  mainRoute,
  // button module
  buttonRouteTree,
  // 輪播圖
  carouselRouteTree,
  // video module
  videoRoute,
  // usecase module
  useCaseRouteTree,
  // form module
  formTreeRoute,
  // chart module
  chartRoute,
  // table module
  tableRoute,
])
