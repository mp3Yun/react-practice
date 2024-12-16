import ButtonDetailPage from '../feature/button/ButtonDetailPage'
import ButtonIdPage from '../feature/button/ButtonIdPage'
import ButtonPage from '../feature/button/ButtonPage'
import CarouselPage from '../feature/carousel/CarouselPage'
import ImageCarouselPage from '../feature/carousel/ImageCarouselPage'
import HomePage from '../feature/home/HomePage'
import LoginPage from '../feature/login/LoginPage'
import MainPage from '../feature/main/MainPage'
import RouteConfigDto from './route-config.dto'

// 跳頁路徑，要使用絕對路徑
export enum RoutePathEnum {
  Login = '/',
  // Home 底下的模組
  Home = '/home',
  Main = '/home/main',
  Button = '/home/button',
  ButtonId = '/home/button/$postId',
  ButtonDetail = '/home/button/detail',
  Carousel = '/home/carousel',
  ImageCarousel = '/home/carousel/imageCarousel',
}

export const routePathMaps: Record<RoutePathEnum, RouteConfigDto> = {
  [RoutePathEnum.Login]: {
    component: LoginPage,
  },
  [RoutePathEnum.Home]: {
    component: HomePage,
  },
  [RoutePathEnum.Main]: {
    component: MainPage,
  },
  // button module
  [RoutePathEnum.Button]: {
    component: ButtonPage,
  },
  [RoutePathEnum.ButtonId]: {
    component: ButtonIdPage,
  },
  [RoutePathEnum.ButtonDetail]: {
    component: ButtonDetailPage,
  },
  // carousel module
  [RoutePathEnum.Carousel]: {
    component: CarouselPage,
  },
  [RoutePathEnum.ImageCarousel]: {
    component: ImageCarouselPage,
  },
}
