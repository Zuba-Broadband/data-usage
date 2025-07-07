import { useState, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  LogOut, 
  Users, 
  Database, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Plus
} from 'lucide-react'
import { DataUsageChart } from './DataUsageChart'
import { ClientsTable } from './ClientsTable'
import { UsageFilters } from './UsageFilters'

export const Dashboard = () => {
  const { user, signOut } = useAuth()
  const [clients, setClients] = useState([])
  const [dataUsage, setDataUsage] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalClients: 0,
    totalUsage: 0,
    currentMonthUsage: 0,
    averageUsage: 0
  })
  const [filters, setFilters] = useState({
    clientId: '',
    startDate: '',
    endDate: '',
    minUsage: '',
    maxUsage: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchDataUsage()
  }, [filters])

  const fetchData = async () => {
    try {
      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('name')

      if (clientsError) throw clientsError

      // Fetch all data usage for stats
      const { data: usageData, error: usageError } = await supabase
        .from('data_usage')
        .select(`
          *,
          clients (
            name,
            email
          )
        `)
        .order('date', { ascending: false })

      if (usageError) throw usageError

      setClients(clientsData || [])
      setDataUsage(usageData || [])
      
      // Calculate stats
      const totalUsage = usageData?.reduce((sum, record) => sum + parseFloat(record.total_usage || 0), 0) || 0
      const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
      const currentMonthUsage = usageData?.filter(record => 
        record.date.startsWith(currentMonth)
      ).reduce((sum, record) => sum + parseFloat(record.total_usage || 0), 0) || 0

      setStats({
        totalClients: clientsData?.length || 0,
        totalUsage: totalUsage,
        currentMonthUsage: currentMonthUsage,
        averageUsage: clientsData?.length > 0 ? totalUsage / clientsData.length : 0
      })

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDataUsage = async () => {
    try {
      let query = supabase
        .from('data_usage')
        .select(`
          *,
          clients (
            name,
            email
          )
        `)

      // Apply filters
      if (filters.clientId) {
        query = query.eq('client_id', filters.clientId)
      }
      if (filters.startDate) {
        query = query.gte('date', filters.startDate)
      }
      if (filters.endDate) {
        query = query.lte('date', filters.endDate)
      }
      if (filters.minUsage) {
        query = query.gte('total_usage', parseFloat(filters.minUsage))
      }
      if (filters.maxUsage) {
        query = query.lte('total_usage', parseFloat(filters.maxUsage))
      }

      query = query.order('date', { ascending: false })

      const { data, error } = await query

      if (error) throw error

      setDataUsage(data || [])
    } catch (error) {
      console.error('Error fetching filtered data:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const exportData = () => {
    // Create CSV content
    const headers = ['Date', 'Client', 'Kit 1 Usage (GB)', 'Kit 2 Usage (GB)', 'Total Usage (GB)']
    const csvContent = [
      headers.join(','),
      ...dataUsage.map(record => [
        record.date,
        record.clients?.name || 'Unknown',
        record.kit_1_usage,
        record.kit_2_usage,
        record.total_usage
      ].join(','))
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zuba-broadband-usage-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Zuba Broadband</h1>
              <Badge variant="secondary" className="ml-3">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
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
          <DataUsageChart data={dataUsage} />
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
                Export Data (CSV)
              </Button>
              <Button className="w-full" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <UsageFilters 
          filters={filters} 
          setFilters={setFilters} 
          clients={clients}
        />

        {/* Data Table */}
        <ClientsTable data={dataUsage} />
      </main>
    </div>
  )
}

