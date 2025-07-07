import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Users, 
  Database, 
  TrendingUp, 
  Calendar,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

// Demo data
const demoClients = [
  { id: '1', name: 'Bank of Kigali', email: 'it@bk.rw' },
  { id: '2', name: 'Rwanda Development Board', email: 'info@rdb.rw' },
  { id: '3', name: 'University of Rwanda', email: 'info@ur.ac.rw' }
]

const demoDataUsage = [
  { id: '1', client_id: '1', date: '2025-01-23', kit_1_usage: 60.0, kit_2_usage: 0.0, total_usage: 60.0, clients: { name: 'Bank of Kigali', email: 'it@bk.rw' } },
  { id: '2', client_id: '1', date: '2025-01-27', kit_1_usage: 61.0, kit_2_usage: 0.0, total_usage: 61.0, clients: { name: 'Bank of Kigali', email: 'it@bk.rw' } },
  { id: '3', client_id: '1', date: '2025-02-10', kit_1_usage: 101.0, kit_2_usage: 0.0, total_usage: 101.0, clients: { name: 'Bank of Kigali', email: 'it@bk.rw' } },
  { id: '4', client_id: '1', date: '2025-03-11', kit_1_usage: 39.0, kit_2_usage: 29.0, total_usage: 68.0, clients: { name: 'Bank of Kigali', email: 'it@bk.rw' } },
  { id: '5', client_id: '1', date: '2025-06-19', kit_1_usage: 107.0, kit_2_usage: 135.0, total_usage: 242.0, clients: { name: 'Bank of Kigali', email: 'it@bk.rw' } },
  { id: '6', client_id: '1', date: '2025-06-26', kit_1_usage: 142.0, kit_2_usage: 104.0, total_usage: 246.0, clients: { name: 'Bank of Kigali', email: 'it@bk.rw' } },
  { id: '7', client_id: '2', date: '2025-01-15', kit_1_usage: 45.0, kit_2_usage: 23.0, total_usage: 68.0, clients: { name: 'Rwanda Development Board', email: 'info@rdb.rw' } },
  { id: '8', client_id: '2', date: '2025-02-20', kit_1_usage: 78.0, kit_2_usage: 56.0, total_usage: 134.0, clients: { name: 'Rwanda Development Board', email: 'info@rdb.rw' } },
  { id: '9', client_id: '3', date: '2025-03-05', kit_1_usage: 23.0, kit_2_usage: 12.0, total_usage: 35.0, clients: { name: 'University of Rwanda', email: 'info@ur.ac.rw' } }
]

export const DemoMode = () => {
  const [data, setData] = useState(demoDataUsage)
  const [stats, setStats] = useState({
    totalClients: 3,
    totalUsage: 1057.0,
    currentMonthUsage: 488.0,
    averageUsage: 352.3
  })

  // Chart data
  const chartData = data.slice(0, 6).reverse().map(record => ({
    date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    'Kit 1': parseFloat(record.kit_1_usage || 0),
    'Kit 2': parseFloat(record.kit_2_usage || 0),
    'Total': parseFloat(record.total_usage || 0)
  }))

  const getUsageBadgeVariant = (usage) => {
    if (usage > 100) return 'destructive'
    if (usage > 50) return 'default'
    if (usage > 0) return 'secondary'
    return 'outline'
  }

  const exportData = () => {
    const headers = ['Date', 'Client', 'Kit 1 Usage (GB)', 'Kit 2 Usage (GB)', 'Total Usage (GB)']
    const csvContent = [
      headers.join(','),
      ...data.map(record => [
        record.date,
        record.clients?.name || 'Unknown',
        record.kit_1_usage,
        record.kit_2_usage,
        record.total_usage
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zuba-broadband-demo-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Zuba Broadband</h1>
              <Badge variant="secondary" className="ml-3">Demo Mode</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Demo User</span>
              <Button variant="outline" size="sm">
                Exit Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">Active clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsage.toFixed(1)} GB</div>
              <p className="text-xs text-muted-foreground">All time usage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentMonthUsage.toFixed(1)} GB</div>
              <p className="text-xs text-muted-foreground">Current month usage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Usage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageUsage.toFixed(1)} GB</div>
              <p className="text-xs text-muted-foreground">Per client average</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Recent data usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Usage (GB)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, name) => [`${value} GB`, name]} />
                  <Legend />
                  <Line type="monotone" dataKey="Kit 1" stroke="#ff9800" strokeWidth={2} />
                  <Line type="monotone" dataKey="Kit 2" stroke="#e65100" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your data and generate reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
              <Button className="w-full" variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Demo Data (CSV)
              </Button>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> This is a demonstration with sample data. 
                  Connect to Supabase to use real data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Data Usage Records</CardTitle>
            <CardDescription>
              Sample data usage across all clients ({data.length} records)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Kit 1 (GB)</TableHead>
                    <TableHead className="text-right">Kit 2 (GB)</TableHead>
                    <TableHead className="text-right">Total (GB)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.clients?.name || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">
                            {record.clients?.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {parseFloat(record.kit_1_usage || 0).toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {parseFloat(record.kit_2_usage || 0).toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        {parseFloat(record.total_usage || 0).toFixed(1)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getUsageBadgeVariant(parseFloat(record.total_usage || 0))}>
                          {parseFloat(record.total_usage || 0) > 100 ? 'High' : 
                           parseFloat(record.total_usage || 0) > 50 ? 'Medium' :
                           parseFloat(record.total_usage || 0) > 0 ? 'Low' : 'None'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

