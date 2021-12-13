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

const ConfirmedLineChart = props => {
  const {resultGraphData} = props
  return (
    <div className="confirmed-line-graph-container">
      <p className="confirmed-text">Confirmed</p>
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
        <Line type="monotone" dataKey="count" stroke="#FF073A" />
      </LineChart>
    </div>
  )
}

export default ConfirmedLineChart
