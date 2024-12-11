import ButtonDetailPage from '../feature/button/ButtonDetailPage'
import ButtonPage from '../feature/button/ButtonPage'
import HomePage from '../feature/home/HomePage'
import LoginPage from '../feature/login/LoginPage'
import MainPage from '../feature/main/MainPage'
import RouteConfigDto from './route-config.dto'

export enum RoutePathEnum {
  Login = '/',
  // Home 底下的模組
  Home = '/home',
  Main = '/home/main',
  Button = '/home/button',
  ButtonDetail = '/home/button/detail',
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
  [RoutePathEnum.Button]: {
    component: ButtonPage,
  },
  [RoutePathEnum.ButtonDetail]: {
    component: ButtonDetailPage,
  },
}
