import { Route, Router, Routes, useNavigate } from 'react-router-dom'
import IconDemo from './IconDemo'

function DemoHome() {
  const navigate = useNavigate()

  const handleClick = (page: string) => {
    switch (page) {
      case 'iconDemo':
        navigate('/iconDemo')
        break
      case 'buttonDemo':
        navigate('/buttonDemo')
        break
    }
  }

  return (
    <div>
      <h1
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
      <div className="border-solid border-current"></div>
    </div>
  )
}

export default DemoHome
