import { Route, Router, Routes, useNavigate } from 'react-router-dom'

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
      <h1>Home Page</h1>
      <button onClick={handleClick.bind(null, 'iconDemo')}>
        Go to Icon Demo Page
      </button>
      <button onClick={handleClick.bind(null, 'buttonDemo')}>
        Go to Button Demo Page
      </button>
      <br />
      <br />
      <div className="border-solid border-current">
        {/* <Router location={''} navigator={'/p'}>
					<Routes></Routes>
				</Router> */}
        {/* <Routes>
					<Route path="/" element={<DemoHome />} />
				</Routes> */}
      </div>
    </div>
  )
}

export default DemoHome
