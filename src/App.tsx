import { FC, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { IconDefinitions } from './components/icons/icon.definitions'
import Button, { ButtonProps } from './components/Button'

type ListItem = { id: number; navigatorUrl: string } & ButtonProps

export const App: FC = () => {
  const listItems: ListItem[] = [
    {
      id: 0,
      children: 'Demo Home Page',
      navigatorUrl: '/Demo',
    },
    {
      id: 1,
      children: 'Icon Demo Page',
      navigatorUrl: '/Demo/iconDemo',
    },
    {
      id: 2,
      children: 'Button Demo page',
      prefixIcon: { iconSrc: IconDefinitions.faSearch },
      navigatorUrl: '/Demo/buttonDemo',
    },
    {
      id: 3,
      children: 'Panel Demo page',
      suffixIcon: { iconSrc: IconDefinitions.faPencil },
      navigatorUrl: '/Demo/panelDemo',
    },
    {
      id: 4,
      children: 'Drag Demo page',
      navigatorUrl: '/Demo/dragDemo',
    },
  ]

  const navigate = useNavigate()

  const listItemOnBtnClick = (item: ListItem) => {
    if (item.navigatorUrl) {
      navigate(item.navigatorUrl)
    }
  }

  return (
    <>
      <div className="flex w-[100%] h-[100%]">
        {/* side-menu */}
        <div className="flex-auto w-[20%] h-auto ">
          {listItems.map((item) => (
            <div key={item.id}>
              <Button
                {...item}
                onClick={() => listItemOnBtnClick(item)}
              ></Button>
            </div>
          ))}
        </div>

        {/* content */}
        <div className="flex-initial w-[80%] h-auto">
          <div className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl font-bold">Hello, here is Title !</h1>
          </div>
          <div>
            app outlet:
            <div>
              <Outlet />
            </div>
            app ---
          </div>
        </div>
      </div>
    </>
  )
}

export default App
