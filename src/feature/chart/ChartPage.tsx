import React from 'react'
import NestedComponent from '../../components/NestedComponent'
import { Box } from '@chakra-ui/react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const PieChartComponent = () => {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

const LineChartComponent = () => {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  ]

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
const ChartPage: React.FC = () => {
  return (
    <>
      <NestedComponent title="圓餅圖">
        <PieChartComponent></PieChartComponent>
      </NestedComponent>
      <br />
      <NestedComponent title="折線圖">
        <LineChartComponent></LineChartComponent>
      </NestedComponent>
    </>
  )
}

export default ChartPage
