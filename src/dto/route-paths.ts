import ButtonDetailPage from '../feature/button/ButtonDetailPage'
import ButtonIdPage from '../feature/button/ButtonIdPage'
import ButtonPage from '../feature/button/ButtonPage'
import CarouselPage from '../feature/carousel/CarouselPage'
import ImageCarouselPage from '../feature/carousel/ImageCarouselPage'
import ChartPage from '../feature/chart/ChartPage'
import ChineseCabbagePage from '../feature/chinese-cabbage/ChineseCabbagePage'
import FormCustomInputPage from '../feature/form/FormCustomInputPage'
import FormPage from '../feature/form/FormPage'
import FormSteps2Page from '../feature/form/formSteps2Sample/FormStepsPage2'
import FormSteps3Page from '../feature/form/formSteps3Sample/FormStepsPage3'
import FormStepsPage from '../feature/form/FormStepsPage'
import SampleFormUseFieldArray from '../feature/form/FormUseFieldArraySamplePage'
import GamesPage from '../feature/games'
import MemoryCardPage from '../feature/games/memory-card/MemoryCardPage'
import Number2048Page from '../feature/games/number-2048/Number2048Page'
import SnakeGamePage from '../feature/games/snake-game/SnakeGamePage'
import TicTacToePage from '../feature/games/tic-tac-toe/TicTacToePage'
import WhackAMolePage from '../feature/games/whack-a-mole/WhackAMolePage'
import HomePage from '../feature/home/HomePage'
import LoginPage from '../feature/login/LoginPage'
import MainPage from '../feature/main/MainPage'
import SettingPage from '../feature/setting/SettingPage'
import TablePage from '../feature/table/TablePage'
import UseRefCasePage from '../feature/use-case/useRefCasePage'
import VideoPage from '../feature/video/VideoPage'
import SchedulePage from '../feature/xlsx/schedule/SchedulePage'
import ToursPage from '../feature/xlsx/tours/ToursPage'
import XlsxHomePage from '../feature/xlsx/XlsxHomePage'
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
  ImageCarousel = '/home/imageCarousel',
  Video = '/home/video',
  UseCase = '/home/useCase',
  Form = '/home/form',
  FormCustomInput = '/home/form/customInput',
  FormUseFieldArray = '/home/form/useFieldArray',
  FormSteps = '/home/form/steps',
  FormSteps2 = '/home/form/steps2',
  FormSteps3 = '/home/form/steps3',
  Chart = '/home/chart',
  Table = '/home/table',
  Setting = '/home/setting',
  ChineseCabbage = '/home/chineseCabbage',
  Games = '/home/games',
  TicTacToe = '/home/games/ticTacToe',
  MemoryCard = '/home/games/memoryCard',
  WhackAMole = '/home/games/whackAMole',
  Number2048 = '/home/games/number2048',
  SnakeGame = '/home/games/snakeGame',
  Xlsx = '/home/xlsx',
  Tours = '/home/xlsx/tours',
  Schedules = '/home/xlsx/schedules',
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
  [RoutePathEnum.FormSteps3]: {
    component: FormSteps3Page,
  },
  // chart module
  [RoutePathEnum.Chart]: {
    component: ChartPage,
  },
  // table module
  [RoutePathEnum.Table]: {
    component: TablePage,
  },
  // setting module
  [RoutePathEnum.Setting]: {
    component: SettingPage,
  },
  // chinese cabbage module
  [RoutePathEnum.ChineseCabbage]: {
    component: ChineseCabbagePage,
  },
  // games module
  [RoutePathEnum.Games]: {
    component: GamesPage,
  },
  [RoutePathEnum.TicTacToe]: {
    component: TicTacToePage,
  },
  [RoutePathEnum.MemoryCard]: {
    component: MemoryCardPage,
  },
  [RoutePathEnum.WhackAMole]: {
    component: WhackAMolePage,
  },
  [RoutePathEnum.Number2048]: {
    component: Number2048Page,
  },
  [RoutePathEnum.SnakeGame]: {
    component: SnakeGamePage,
  },
  // xlsx module
  [RoutePathEnum.Xlsx]: {
    component: XlsxHomePage,
  },
  [RoutePathEnum.Tours]: {
    component: ToursPage,
  },
  [RoutePathEnum.Schedules]: {
    component: SchedulePage,
  },
}
