import { Box } from '@chakra-ui/react'
import { useOverlayVisible } from '../../../hooks/OverlayVisibleContext'

const Navbar: React.FC = () => {
  const { isOverlayVisible } = useOverlayVisible()
  const linksData = [
    { id: 1, href: '#home', text: 'home' },
    { id: 2, href: '#about', text: 'about' },
    { id: 3, href: '#services', text: 'services' },
    { id: 4, href: '#tours', text: 'tours' },
  ]
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <img src="./images/logo.svg" className="nav-logo" alt="backroads" />
          <button type="button" className="nav-toggle" id="nav-toggle">
            <i className="fas fa-bars"></i>
          </button>
        </div>
        {/* <!-- left this comment on purpose --> */}
        <ul className="nav-links" id="nav-links">
          {linksData.map((link) => {
            return (
              <li key={link.id}>
                <a href={link.href} className="nav-link">
                  {link.text}
                </a>
              </li>
            )
          })}
        </ul>

        <ul className="nav-icons">
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="nav-icon"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="nav-icon"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="nav-icon"
            >
              <i className="fab fa-squarespace"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
