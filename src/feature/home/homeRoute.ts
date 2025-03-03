import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { Route } from '../../routes/__root'
import { buttonRouteTree } from '../button/buttonRoute'
import { carouselRouteTree } from '../carousel/carouselRoute'
import { chartRoute } from '../chart/chartRoute'
import { chineseCabbageRoute } from '../chinese-cabbage/chineseCabbageRoute'
import { formTreeRoute } from '../form/formRoute'
import { gamesRouteTree } from '../games/gamesRoute'
import { mainRoute } from '../main/mainRoute'
import { settingRoute } from '../setting/settingRoute'
import { tableRoute } from '../table/tableRoute'
import { useCaseRouteTree } from '../use-case/useCaseRoute'
import { videoRoute } from '../video/videoRoute'
import { xlsxRouteTree } from '../xlsx/xlsxRoute'

// 創建路由
export const homeRoute = createRoute({
  getParentRoute: () => Route,
  path: RoutePathEnum.Home, // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Home].component, // 定義該路由的對應組件
})

const isPlanTrip = import.meta.env.VITE_IS_PLAN_TRIP
const tmpRoutes = isPlanTrip
  ? [mainRoute, xlsxRouteTree]
  : [
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
      // setting module
      settingRoute,
      // chinese cabbage moudule
      chineseCabbageRoute,
      // games module
      gamesRouteTree,
      // xlsx module
      xlsxRouteTree,
    ]
// 建立路由樹
export const homeRouteTree = homeRoute.addChildren(tmpRoutes)
