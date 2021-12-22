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

const ActiveLineChart = props => {
  const {resultGraphData} = props
  return (
    <>
      <div className="active-line-graph-container">
        <p>Total Active</p>
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
          <Line type="monotone" dataKey="count" stroke="#007BFF" />
        </LineChart>
      </div>
      <div className="active-line-graph-mobile-container">
        <p>Total Active</p>
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
          <Line type="monotone" dataKey="count" stroke="#007BFF" />
        </LineChart>
      </div>
    </>
  )
}

export default ActiveLineChart
