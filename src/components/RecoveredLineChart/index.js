import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from 'recharts'

import './index.css'

const RecoveredLineChart = props => {
  const {resultGraphData} = props
  return (
    <>
      <div className="recovered-line-graph-container">
        <p>Recovered</p>
        <LineChart
          width={730}
          height={250}
          data={resultGraphData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="resultDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#27A243" />
        </LineChart>
      </div>
      <div className="recovered-line-graph-mobile-container">
        <p>Recovered</p>
        <LineChart
          width={272}
          height={192}
          data={resultGraphData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="resultDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#27A243" />
        </LineChart>
      </div>
    </>
  )
}

export default RecoveredLineChart
