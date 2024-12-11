export default interface RouteConfigDto {
  component: any
  title?: string
  permissions?: string[]
  children?: RouteConfigDto[]
}
