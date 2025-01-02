import ButtonDetailPage from '../feature/button/ButtonDetailPage'
import ButtonIdPage from '../feature/button/ButtonIdPage'
import ButtonPage from '../feature/button/ButtonPage'
import CarouselPage from '../feature/carousel/CarouselPage'
import ImageCarouselPage from '../feature/carousel/ImageCarouselPage'
import FormCustomInputPage from '../feature/form/FormCustomInputPage'
import FormPage from '../feature/form/FormPage'
import FormStepsPage from '../feature/form/FormStepsPage'
import FormSteps2Page from '../feature/form/formSteps2Sample/FormStepsPage2'
import SampleFormUseFieldArray from '../feature/form/FormUseFieldArraySamplePage'
import HomePage from '../feature/home/HomePage'
import LoginPage from '../feature/login/LoginPage'
import MainPage from '../feature/main/MainPage'
import UseRefCasePage from '../feature/use-case/useRefCasePage'
import VideoPage from '../feature/video/VideoPage'
import RouteConfigDto from './route-config.dto'
import ChartPage from '../feature/chart/ChartPage'
import TablePage from '../feature/table/TablePage'

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
  ImageCarousel = '/home/imageCarousel',
  Video = '/home/video',
  UseCase = '/home/useCase',
  Form = '/home/form',
  FormCustomInput = '/home/form/customInput',
  FormUseFieldArray = '/home/form/useFieldArray',
  FormSteps = '/home/form/steps',
  FormSteps2 = '/home/form/steps2',
  Chart = '/home/chart',
  Table = '/home/table',
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
  // video module
  [RoutePathEnum.Video]: {
    component: VideoPage,
  },
  // use case module
  [RoutePathEnum.UseCase]: {
    component: UseRefCasePage,
  },
  // form module
  [RoutePathEnum.Form]: {
    component: FormPage,
  },
  [RoutePathEnum.FormCustomInput]: {
    component: FormCustomInputPage,
  },
  [RoutePathEnum.FormUseFieldArray]: {
    component: SampleFormUseFieldArray,
  },
  [RoutePathEnum.FormSteps]: {
    component: FormStepsPage,
  },
  [RoutePathEnum.FormSteps2]: {
    component: FormSteps2Page,
  },
  // chart module
  [RoutePathEnum.Chart]: {
    component: ChartPage,
  },
  // table module
  [RoutePathEnum.Table]: {
    component: TablePage,
  },
}
