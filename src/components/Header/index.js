import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {showOrHideNavContent} = props
  const clickAddToQueue = () => {
    showOrHideNavContent()
  }

  return (
    <nav className="header-container">
      <Link to="/" className="link-item">
        <h1 className="covid-heading">COVID19INDIA</h1>
      </Link>

      <button
        type="button"
        className="add-to-queue-btn"
        onClick={clickAddToQueue}
      >
        <img src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1637147265/add-to-queue_1_ykzt3l.png" />
      </button>
      <ul className="header-items-container">
        <Link to="/" className="link-item">
          <li className="home-text">Home</li>
        </Link>
        <li>Vaccination</li>
        <Link to="/about" className="link-item">
          <li className="about-text">About</li>
        </Link>
      </ul>
    </nav>
  )
}
export default Header
