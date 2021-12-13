import './index.css'

const TotalData = props => {
  const {totalConfirmed, totalActive, totalRecovered, totalDeceased} = props
  return (
    <div className="total-data-container">
      <div className="confirmed-container" testid="countryWideConfirmedCases">
        <p>Confirmed</p>
        <div className="round">
          <img
            src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636638667/Vectorright_1_jj48g9.png"
            alt="country wide confirmed cases pic"
          />
        </div>
        <p>{totalConfirmed}</p>
      </div>
      <div className="active-container" testid="countryWideActiveCases">
        <p>Active</p>
        <img
          src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636638409/protection_1active_yjy72v.png"
          alt="country wide active cases pic"
        />
        <p>{totalActive}</p>
      </div>
      <div className="recovered-container" testid="countryWideRecoveredCases">
        <p>Recovered</p>
        <img
          src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636639291/recovered_1_glek4z.png"
          alt="country wide recovered cases pic"
        />
        <p>{totalRecovered}</p>
      </div>
      <div className="deceased-container" testid="countryWideDeceasedCases">
        <p>Deceased</p>
        <img
          src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636639364/breathing_1_hst8zn.png"
          alt="country wide deceased cases pic"
        />
        <p>{totalDeceased}</p>
      </div>
    </div>
  )
}
export default TotalData
