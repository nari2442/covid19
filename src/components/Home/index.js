import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'
import Header from '../Header'
import TotalData from '../TotalData'
import StatewiseDetails from '../StatewiseDetails'
import Footer from '../Footer'
import StatesDropDown from '../StatesDropDown'

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

class Home extends Component {
  state = {
    eachStateDataList: [],
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    hideNavContent: true,
    activeStatus: statusConstants.initial,
    dropDownList: [],
  }

  componentDidMount() {
    this.getCovidDetails()
  }

  getCovidDetails = async () => {
    this.setState({activeStatus: statusConstants.inProgress})
    const statesApi = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(statesApi, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getsuccessView(data)
      this.setState({activeStatus: statusConstants.success})
    } else {
      this.setState({activeStatus: statusConstants.failure})
    }
  }

  getsuccessView = data => {
    const keyNames = Object.keys(data)

    const resultList = []

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0

        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const findingStateName = statesList.find(
          state => state.state_code === keyName,
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

    const totalConfirmedList = resultList.map(eachState => eachState.confirmed)
    const totalConfirmed = totalConfirmedList.reduce((a, b) => a + b, 0)
    const totalRecoveredList = resultList.map(eachState => eachState.recovered)
    const totalRecovered = totalRecoveredList.reduce((a, b) => a + b, 0)
    const totalDeceasedList = resultList.map(eachState => eachState.deceased)
    const totalDeceased = totalDeceasedList.reduce((a, b) => a + b, 0)
    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    this.setState({
      eachStateDataList: resultList,
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
    })
  }

  showOrHideNavContent = () => {
    this.setState(prevState => ({hideNavContent: !prevState.hideNavContent}))
  }

  clickCloseButton = () => {
    this.setState(prevState => ({hideNavContent: !prevState.hideNavContent}))
  }

  changeSearchInput = event => {
    const {eachStateDataList} = this.state
    const dropDownList = eachStateDataList.filter(eachState =>
      eachState.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({dropDownList})
  }

  changeToAscending = () => {
    const {eachStateDataList} = this.state
    eachStateDataList.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }
      return 0
    })
    this.setState({eachStateDataList})
  }

  changeToDescending = () => {
    const {eachStateDataList} = this.state
    eachStateDataList.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1
      }
      return 0
    })
    this.setState({eachStateDataList})
  }

  renderSuccessView = () => {
    const {
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
      eachStateDataList,
      dropDownList,
      hideNavContent,
    } = this.state

    return (
      <div className="home-container">
        <Header showOrHideNavContent={this.showOrHideNavContent} />
        <div>
          {hideNavContent ? (
            ''
          ) : (
            <div className="mobile-nav-content-container">
              <div className="mobile-nav-content-items">
                <Link to="/" className="link-item">
                  <p className="mobile-home-text">Home</p>
                </Link>
                <Link to="/about" className="link-item">
                  <p className="mobile-about-text">About</p>
                </Link>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={this.clickCloseButton}
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </div>
          )}
        </div>
        <div className="search-align">
          <div className="search-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Enter the state"
              onChange={this.changeSearchInput}
            />
          </div>
        </div>

        <ul
          className="drop-down-items-container"
          testid="searchResultsUnorderedList"
        >
          {dropDownList.map(eachState => (
            <StatesDropDown
              dropDownDetails={eachState}
              key={eachState.stateCode}
            />
          ))}
        </ul>

        <TotalData
          totalConfirmed={totalConfirmed}
          totalActive={totalActive}
          totalRecovered={totalRecovered}
          totalDeceased={totalDeceased}
        />
        <StatewiseDetails
          eachStateDataList={eachStateDataList}
          changeToAscending={this.changeToAscending}
          changeToDescending={this.changeToDescending}
        />
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
    <div className="covid-loader-container" testid="homeRouteLoader">
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

export default Home
