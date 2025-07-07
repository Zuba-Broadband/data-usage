import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export const SimpleDemo = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Zuba Broadband Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>Data Usage Management System</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This is a demo of the Zuba Broadband data usage management application.
              </p>
              <Button onClick={() => setCount(count + 1)}>
                Click count: {count}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>What this application offers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Client data usage tracking</li>
                <li>• Monthly usage reports</li>
                <li>• Advanced filtering</li>
                <li>• Data visualization</li>
                <li>• Export capabilities</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sample Data</CardTitle>
            <CardDescription>Example client usage data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Client</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Kit 1 (GB)</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Kit 2 (GB)</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total (GB)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Bank of Kigali</td>
                    <td className="border border-gray-300 px-4 py-2">2025-06-19</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">107.0</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">135.0</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold">242.0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Rwanda Development Board</td>
                    <td className="border border-gray-300 px-4 py-2">2025-02-20</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">78.0</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">56.0</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold">134.0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">University of Rwanda</td>
                    <td className="border border-gray-300 px-4 py-2">2025-03-05</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">23.0</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">12.0</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-bold">35.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            This is a working demo. The full application includes authentication, 
            database integration, and advanced features.
          </p>
          <div className="space-x-4">
            <Button variant="outline">View Login</Button>
            <Button>Full Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

