import {Link, withRouter} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const StatesDropDown = props => {
  const {dropDownDetails} = props
  const {name, stateCode} = dropDownDetails

  const clickStateLink = () => {
    const {history} = props
    history.replace(`/state/${stateCode}`)
  }

  return (
    <Link
      to={`/state/${stateCode}`}
      onClick={clickStateLink}
      className="link-item"
    >
      <li className="drop-down-container">
        <p className="drop-down-name">{name}</p>
        <div className="indication-container">
          <p className="drop-down-state-code">{stateCode}</p>
          <BiChevronRightSquare className="right-icon" />
        </div>
      </li>
    </Link>
  )
}
export default withRouter(StatesDropDown)
