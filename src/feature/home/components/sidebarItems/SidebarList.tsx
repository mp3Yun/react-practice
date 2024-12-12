import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { Link, Route, useRouter } from '@tanstack/react-router'
import React from 'react'

type FormattedRoute = {
  id?: number
  path: string
  name: string
  hasChildren: boolean
  children?: FormattedRoute[]
}

// const parserRoute = (routes: [string, unknown][]): FormattedRoute[] => {
//   // 將路由轉換為基本格式
//   const formattedRoutes: FormattedRoute[] = routes.map(([path]) => {
//     const name = path.split('/').filter(Boolean).pop() || '' // 提取最後的路徑部分作為 name
//     return { path, name, hasChildren: false, children: [] }
//   })

//   // 建立路由的樹狀結構
//   const buildTree = (parentPath: string): FormattedRoute[] => {
//     return formattedRoutes
//       .filter(
//         (route) =>
//           route.path.startsWith(parentPath + '/') && route.path !== parentPath
//       )
//       .map((childRoute) => {
//         const children = buildTree(childRoute.path) // 遞迴處理子路由
//         return {
//           ...childRoute,
//           hasChildren: children.length > 0,
//           children,
//         }
//       })
//   }

//   // 組裝最終結構
//   const finalRoutes = formattedRoutes
//     .filter((route) => !route.path.includes('/', 1)) // 篩選出根路徑（無父路徑的路由）
//     .map((rootRoute, index) => {
//       const children = buildTree(rootRoute.path)
//       return {
//         id: index + 1, // 唯一 ID
//         ...rootRoute,
//         hasChildren: children.length > 0,
//         children,
//       }
//     })

//   console.log(finalRoutes)
//   return finalRoutes
// }

const parserRoute = (routes: [string, unknown][]): FormattedRoute[] => {
  // 將路由轉換為基本格式
  const formattedRoutes: FormattedRoute[] = routes.map(([path]) => {
    const name = path.split('/').filter(Boolean).pop() || '' // 提取最後的路徑部分作為 name
    return { path, name, hasChildren: false, children: [] }
  })

  // 建立樹狀結構（僅包含下一層的子路徑）
  const buildTree = (parentPath: string): FormattedRoute[] => {
    return formattedRoutes
      .filter((route) => {
        const isDirectChild =
          route.path.startsWith(parentPath + '/') && // 確保是當前父路徑的子路徑
          route.path.split('/').length === parentPath.split('/').length + 1 // 僅包含下一層級
        return isDirectChild
      })
      .map((childRoute) => {
        const children = buildTree(childRoute.path) // 遞迴處理子路徑
        return {
          ...childRoute,
          hasChildren: children.length > 0,
          children,
        }
      })
  }

  // 組裝最終結構
  const finalRoutes = formattedRoutes
    .filter((route) => !route.path.includes('/', 1)) // 篩選出根路徑（無父路徑的路由）
    .map((rootRoute, index) => {
      const children = buildTree(rootRoute.path)
      return {
        id: index + 1, // 唯一 ID
        ...rootRoute,
        hasChildren: children.length > 0 && rootRoute.name !== 'home',
        children,
      }
    })

  console.log(finalRoutes)
  return finalRoutes
}

const SidebarList: React.FC = () => {
  const router = useRouter()
  const routesData = Object.entries(router.routesByPath) // 獲取所有 key 值
  const tmpMenu = parserRoute(routesData)
  const home = tmpMenu.filter((item) => item.path === '/home')[0]
  const otherModule = home.children
  const menu =
    otherModule && otherModule?.length > 0 ? [home, ...otherModule] : [home]

  // 渲染子選單
  const renderChildren = (children: FormattedRoute[]) => {
    return children.map((child, index) => (
      <AccordionItem key={index}>
        <h3>
          <Link to={child.path}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {child.name}
              </Box>
            </AccordionButton>
          </Link>
        </h3>
      </AccordionItem>
    ))
  }

  return (
    <Accordion bg={'gray.50'} defaultIndex={[0]} allowMultiple flexDir={'row'}>
      {menu.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <Link to={item.path}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {item.name}
                </Box>
                {item.hasChildren && <AccordionIcon />}
              </AccordionButton>
            </Link>
          </h2>
          {item.hasChildren && item.children && (
            <AccordionPanel pb={4}>
              {renderChildren(item.children)}
            </AccordionPanel>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default SidebarList
