import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import './index.css'
import StateItem from '../StateItem'

const StatewiseDetails = props => {
  const {eachStateDataList, changeToAscending, changeToDescending} = props

  const clickAscending = () => {
    changeToAscending()
  }

  const clickDescending = () => {
    changeToDescending()
  }

  return (
    <div
      className="statewise-details-container"
      testid="stateWiseCovidDataTable"
    >
      <div className="state-details-headings-container">
        <p className="details-heading">States/UT</p>
        <div className="sorting-icons">
          <button
            type="button"
            className="sort-button"
            onClick={clickAscending}
          >
            <FcGenericSortingAsc />
          </button>
          <button
            type="button"
            className="sort-button"
            onClick={clickDescending}
          >
            <FcGenericSortingDesc />
          </button>
        </div>

        <p className="confirmed-heading">Confirmed</p>
        <p className="details-heading">Active</p>
        <p className="details-heading">Recovered</p>
        <p className="details-heading">Deceased</p>
        <p className="details-heading">Population</p>
      </div>
      <hr />
      <ul>
        {eachStateDataList.map(eachState => (
          <StateItem stateDetails={eachState} key={eachState.stateCode} />
        ))}
      </ul>
    </div>
  )
}
export default StatewiseDetails
