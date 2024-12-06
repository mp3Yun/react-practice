import { Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom'
import IconDemo from './IconDemo'

function DemoHome() {
  const navigate = useNavigate()

  const handleClick = (page: string) => {
    switch (page) {
      case 'iconDemo':
        navigate('/IconDemo')
        break
      case 'buttonDemo':
        navigate('/Demo/ButtonDemo')
        break
    }
  }

  return (
    <div>
      {/* <h1
        className="border-solid border-2 border-inherit"
        onClick={() => {
          navigate('/')
        }}
      >
        Home Page 1
      </h1>
      <h1
        onClick={() => {
          navigate('/second')
        }}
      >
        page 2
      </h1> */}
      <h1
        onClick={() => {
          navigate('/login')
        }}
      >
        login page
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleClick.bind(null, 'iconDemo')}>
          Go to Icon Demo Page
        </button>
        <button onClick={handleClick.bind(null, 'buttonDemo')}>
          Go to Button Demo Page
        </button>
      </div>
      <br />
      <br />
      Here is Demo Home Page Content
      <div className="flex border-solid border-2 border-orange-200">
        <Outlet />
      </div>
    </div>
  )
}

export default DemoHome
