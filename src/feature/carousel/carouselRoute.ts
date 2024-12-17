import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

// carousel index page
export const carouselRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/carousel', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Carousel].component, // 定義該路由的對應組件
})

// image carousel page // 被歸在子模組底下
export const imageCarouselRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/imageCarousel', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.ImageCarousel].component, // 定義該路由的對應組件
})

// carousel module
export const carouselRouteTree = carouselRoute.addChildren([imageCarouselRoute])
