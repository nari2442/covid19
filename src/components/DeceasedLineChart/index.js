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

const DeceasedLineChart = props => {
  const {resultGraphData} = props
  return (
    <div className="deceased-line-graph-container">
      <p>Deceased</p>
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
        <Line type="monotone" dataKey="count" stroke="#6C757D" />
      </LineChart>
    </div>
  )
}

export default DeceasedLineChart
