import './index.css'

const StateItem = props => {
  const {stateDetails} = props
  const {
    stateCode,
    name,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = stateDetails

  return (
    <li className="state-item-details-container">
      <p className="state-name">{name}</p>
      <p className="confirmed-count">{confirmed}</p>
      <p className="active-count">{active}</p>
      <p className="recovered-count">{recovered}</p>
      <p className="deceased-count">{deceased}</p>
      <p className="population-count">{population}</p>
    </li>
  )
}
export default StateItem
