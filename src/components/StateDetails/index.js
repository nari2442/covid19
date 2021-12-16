import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import GraphsData from '../GraphsData'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN  PROGRESS',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const casesConstants = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateDetails extends Component {
  state = {
    activeStateCode: '',
    totalCasesDetails: [],
    topDistricts: [],
    activeStatus: statusConstants.initial,

    lastUpdateDate: '',
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    this.setState({activeStatus: statusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode)
    const stateApiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const options = {
      method: 'GET',
    }
    const response = await fetch(stateApiUrl, options)
    const jsonData = await response.json()
    console.log(jsonData)

    if (response.ok === true) {
      const keyNames = Object.keys(jsonData)

      const resultList = []

      keyNames.forEach(keyName => {
        if (jsonData[stateCode]) {
          const {total} = jsonData[stateCode]

          const confirmed = total.confirmed ? total.confirmed : 0

          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = jsonData[stateCode].meta.population
            ? jsonData[stateCode].meta.population
            : 0
          const findingStateName = statesList.find(
            state => state.state_code === stateCode,
          )

          resultList.push({
            stateCode: keyName,
            name:
              findingStateName !== undefined
                ? findingStateName.state_name
                : 'Unknown',
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      })

      const districtsArray = Object.keys(jsonData[stateCode].districts)

      this.setState({
        totalCasesDetails: resultList,
        activeStateCode: stateCode,
        activeStatus: statusConstants.success,
        topDistricts: districtsArray,
      })
    } else {
      this.setState({activeStatus: statusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      activeStateCode,
      totalCasesDetails,
      topDistricts,
      confirmedGraphData,
      activeGraphData,
      recoveredGraphData,
      deceasedGraphData,
      testedGraphData,
      vaccinatedGraphData,
      lastUpdateDate,
    } = this.state

    const {confirmed, recovered, deceased, name, tested} = totalCasesDetails[0]
    const active = confirmed - recovered - deceased
    return (
      <div className="state-details-container">
        <Header />
        <div className="name-tested-container">
          <div className="name-lastupdated-container">
            <div className="name-container">
              <h1 className="state-name-text">{name}</h1>
            </div>
            <p className="last-updated-text">
              last updated on {lastUpdateDate}
            </p>
          </div>
          <div className="tested-container">
            <p className="tested">Tested</p>
            <p className="tested">{tested}</p>
          </div>
        </div>

        <div className="total-cases-container">
          <div
            className="state-confirmed-container"
            testid="stateSpecificConfirmedCasesContainer"
          >
            <p className="state-confirmed-text">Confirmed</p>
            <div className="round">
              <img
                src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636638667/Vectorright_1_jj48g9.png"
                alt="state specific confirmed cases pic"
              />
            </div>
            <p className="state-total-confirmed">{confirmed}</p>
          </div>
          <div
            className="state-active-container"
            testid="stateSpecificActiveCasesContainer"
          >
            <p className="state-active-text">Active</p>
            <img
              src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636638409/protection_1active_yjy72v.png"
              alt="state specific active cases pic"
            />
            <p className="state-total-confirmed">{active}</p>
          </div>
          <div
            className="state-recovered-container"
            testid="stateSpecificRecoveredCasesContainer"
          >
            <p className="state-recovered-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636639291/recovered_1_glek4z.png"
              alt="state specific recovered cases pic"
            />
            <p className="state-total-recovered">{recovered}</p>
          </div>
          <div
            className="state-deceased-container"
            testid="stateSpecificDeceasedCasesContainer"
          >
            <p className="state-deceased-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636639364/breathing_1_hst8zn.png"
              alt="state specific deceased cases pic"
            />
            <p className="state-total-deceased">{deceased}</p>
          </div>
        </div>
        <h1 className="top-districts-heading">Top Districts</h1>
        <ul
          className="district-names-container"
          testid="topDistrictsUnorderedList"
        >
          {topDistricts.map(eachDistrict => (
            <li className="each-district-list" key={eachDistrict}>
              <p className="each-district-name">{eachDistrict}</p>
            </li>
          ))}
        </ul>
        <GraphsData />

        <Footer />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1637234267/Group_7485_vqh3vg.png"
        className="failed-img"
      />
      <h1>PAGE NOT FOUND</h1>
      <p className="failure-para">
        We're sorry, the page you requested could not be found please go back to
        the home page
      </p>
      <button type="button" className="home-button">
        Home
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="stateDetailsLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.failure:
        return this.renderFailureView()
      case statusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderViews()
  }
}
export default StateDetails
