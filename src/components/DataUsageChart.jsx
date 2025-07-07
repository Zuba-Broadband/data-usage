import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { format, parseISO } from 'date-fns'

export const DataUsageChart = ({ data }) => {
  // Process data for chart
  const chartData = data
    .slice(0, 30) // Last 30 records
    .reverse() // Show chronologically
    .map(record => ({
      date: format(parseISO(record.date), 'MMM dd'),
      'Kit 1': parseFloat(record.kit_1_usage || 0),
      'Kit 2': parseFloat(record.kit_2_usage || 0),
      'Total': parseFloat(record.total_usage || 0),
      client: record.clients?.name || 'Unknown'
    }))

  // Aggregate data by month for monthly view
  const monthlyData = data.reduce((acc, record) => {
    const month = format(parseISO(record.date), 'MMM yyyy')
    if (!acc[month]) {
      acc[month] = {
        month,
        'Kit 1': 0,
        'Kit 2': 0,
        'Total': 0
      }
    }
    acc[month]['Kit 1'] += parseFloat(record.kit_1_usage || 0)
    acc[month]['Kit 2'] += parseFloat(record.kit_2_usage || 0)
    acc[month]['Total'] += parseFloat(record.total_usage || 0)
    return acc
  }, {})

  const monthlyChartData = Object.values(monthlyData)
    .sort((a, b) => new Date(a.month) - new Date(b.month))

  return (
    <div className="space-y-6">
      {/* Daily Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Trends</CardTitle>
          <CardDescription>Last 30 data points</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: 'Usage (GB)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [`${value} GB`, name]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Kit 1" 
                stroke="#ff9800" 
                strokeWidth={2}
                dot={{ fill: '#ff9800', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="Kit 2" 
                stroke="#e65100" 
                strokeWidth={2}
                dot={{ fill: '#e65100', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage Summary</CardTitle>
          <CardDescription>Usage aggregated by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                label={{ value: 'Usage (GB)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [`${value.toFixed(1)} GB`, name]}
              />
              <Legend />
              <Bar dataKey="Kit 1" fill="#ff9800" />
              <Bar dataKey="Kit 2" fill="#e65100" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

