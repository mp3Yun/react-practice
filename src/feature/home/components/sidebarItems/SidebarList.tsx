import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import React from 'react'

const menu = [
  {
    id: 1,
    path: '/home',
    name: 'home',
    hasChildren: false,
  },
  {
    id: 2,
    path: '/home/button',
    name: 'Button',
    hasChildren: true,
  },
]

export const renderRoutes = () => (
  <ul>
    {menu.map((route) => (
      <li key={route.path}>
        <Link to={route.path}>{route.name}</Link>
      </li>
    ))}
  </ul>
)

const SidebarList: React.FC = () => {
  return (
    <Accordion bg={'gray.50'} defaultIndex={[0]} allowMultiple flexDir={'row'}>
      {menu.map((item) => (
        <AccordionItem key={item.id}>
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
          {item.hasChildren && <AccordionPanel pb={4}></AccordionPanel>}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default SidebarList
