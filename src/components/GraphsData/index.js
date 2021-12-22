import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'

import ConfirmedLineChart from '../ConfirmedLineChart'
import ActiveLineChart from '../ActiveLineChart'
import RecoveredLineChart from '../RecoveredLineChart'
import DeceasedLineChart from '../DeceasedLineChart'
import TestedLineChart from '../TestedLineChart'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN  PROGRESS',
}

class GraphsData extends Component {
  state = {
    confirmedGraphData: [],
    activeGraphData: [],
    recoveredGraphData: [],
    deceasedGraphData: [],
    testedGraphData: [],
    vaccinatedGraphData: [],
    activeStatus: statusConstants.initial,
  }

  componentDidMount = () => {
    this.getGraphsData()
  }

  getGraphsData = async () => {
    this.setState({activeStatus: statusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jsonData = await response.json()
    if (response.ok === true) {
      this.setState({activeStatus: statusConstants.success})
      const datesArray = Object.keys(jsonData[stateCode].dates)

      const lastUpdateDate = datesArray[datesArray.length - 1]

      const confirmedBarData = datesArray.map(date => ({
        resultDate: date,
        count: jsonData[stateCode].dates[date].total.confirmed,
      }))

      const updatedConfirmedBarGraphData = confirmedBarData.splice(
        confirmedBarData.length - 10,
        confirmedBarData.length,
      )

      const recoveredBarData = datesArray.map(date => ({
        resultDate: date,
        count: jsonData[stateCode].dates[date].total.recovered,
      }))

      const updatedRecoveredBarGraphData = recoveredBarData.splice(
        recoveredBarData.length - 10,
        recoveredBarData.length,
      )

      const deceasedBarData = datesArray.map(date => ({
        resultDate: date,
        count: jsonData[stateCode].dates[date].total.deceased,
      }))

      const updatedDeceasedBarGraphData = deceasedBarData.splice(
        deceasedBarData.length - 10,
        deceasedBarData.length,
      )

      const testedBarData = datesArray.map(date => ({
        resultDate: date,
        count: jsonData[stateCode].dates[date].total.tested,
      }))

      const updatedTestedBarGraphData = testedBarData.splice(
        testedBarData.length - 10,
        testedBarData.length,
      )

      const vaccinatedBarData = datesArray.map(date => ({
        resultDate: date,
        count:
          jsonData[stateCode].dates[date].total.vaccinated1 +
          jsonData[stateCode].dates[date].total.vaccinated2,
      }))

      const updatedVaccinatedBarGraphData = vaccinatedBarData.splice(
        vaccinatedBarData.length - 10,
        vaccinatedBarData.length,
      )

      const activeBarData = datesArray.map(date => ({
        resultDate: date,
        count:
          jsonData[stateCode].dates[date].total.confirmed -
          (jsonData[stateCode].dates[date].total.recovered +
            jsonData[stateCode].dates[date].total.deceased),
      }))

      const updatedActiveBarGraphData = activeBarData.splice(
        activeBarData.length - 10,
        activeBarData.length,
      )

      this.setState({
        confirmedGraphData: updatedConfirmedBarGraphData,
        activeGraphData: updatedActiveBarGraphData,
        recoveredGraphData: updatedRecoveredBarGraphData,
        deceasedGraphData: updatedDeceasedBarGraphData,
        testedGraphData: updatedTestedBarGraphData,
        vaccinatedGraphData: updatedVaccinatedBarGraphData,
      })
    } else {
      this.setState({activeStatus: statusConstants.failure})
    }
  }

  renderBarGraph = () => {
    const {confirmedGraphData} = this.state
    return (
      <>
        <div className="bar-chart-container">
          <BarChart width={1032} height={431} data={confirmedGraphData}>
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="resultDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#9A0E31"
              className="bar"
              label={{position: 'top', color: 'white'}}
            />
          </BarChart>
        </div>
        <div className="bar-chart-mobile-container">
          <BarChart width={312} height={231} data={confirmedGraphData}>
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="resultDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#9A0E31"
              className="bar"
              label={{position: 'top', color: 'white'}}
            />
          </BarChart>
        </div>
      </>
    )
  }

  renderSpreadTrends = () => {
    const {
      confirmedGraphData,
      activeGraphData,
      recoveredGraphData,
      deceasedGraphData,
      testedGraphData,
      vaccinatedGraphData,
    } = this.state
    return (
      <div>
        <h1 className="spread-trends-heading">Spread Trends</h1>
        <div className="cumulative-daily-container">
          <div className="cumulative-container">
            <p className="cumulative-text">Cumulative</p>
          </div>
          <div className="daily-container">
            <p className="daily-text">Daily</p>
          </div>
        </div>
        <div testid="lineChartsContainer">
          <ConfirmedLineChart resultGraphData={confirmedGraphData} />
          <ActiveLineChart resultGraphData={activeGraphData} />
          <RecoveredLineChart resultGraphData={recoveredGraphData} />
          <DeceasedLineChart resultGraphData={deceasedGraphData} />
          <TestedLineChart resultGraphData={testedGraphData} />
        </div>
      </div>
    )
  }

  renderSuccessView = () => (
    <div>
      {this.renderBarGraph()}
      {this.renderSpreadTrends()}
    </div>
  )

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
    <div className="covid-loader-container" testid="timelinesDataLoader">
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

export default withRouter(GraphsData)
