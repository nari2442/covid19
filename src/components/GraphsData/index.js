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

class GraphsData extends Component {
  renderBarGraph = () => {
    const {confirmedGraphData} = this.props
    return (
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
    } = this.props
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

  render() {
    return this.renderSuccessView()
  }
}

export default withRouter(GraphsData)
