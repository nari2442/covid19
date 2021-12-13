import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="covid-heading">COVID19INDIA</h1>
    <p className="footer-para">
      We stand with everyone fighting on the front lines
    </p>
    <div className="footer-follow-container">
      <VscGithubAlt className="social-img" />
      <FiInstagram className="social-img" />
      <FaTwitter className="social-img" />
    </div>
  </div>
)

export default Footer
