import { createRootRoute, Outlet } from '@tanstack/react-router'
import NotFoundPage from '../feature/NotFoundPage'

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFoundPage,
})
