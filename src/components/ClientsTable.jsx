import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { format, parseISO } from 'date-fns'
import { Eye, Edit, Trash2 } from 'lucide-react'

export const ClientsTable = ({ data }) => {
  const getUsageBadgeVariant = (usage) => {
    if (usage > 100) return 'destructive'
    if (usage > 50) return 'default'
    if (usage > 0) return 'secondary'
    return 'outline'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Usage Records</CardTitle>
        <CardDescription>
          Recent data usage across all clients ({data.length} records)
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
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No data usage records found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {format(parseISO(record.date), 'MMM dd, yyyy')}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {data.length > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {data.length} records
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

