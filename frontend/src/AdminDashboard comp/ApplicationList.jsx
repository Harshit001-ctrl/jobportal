"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ApplicationsList() {
  // This would typically come from your backend or state
  const applications = [
    { id: 1, name: "John Doe", position: "Frontend Developer", status: "Pending" },
    { id: 2, name: "Jane Smith", position: "Backend Developer", status: "Interviewed" },
    { id: 3, name: "Bob Johnson", position: "UI Designer", status: "Rejected" },
  ]

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Received Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.position}</TableCell>
                <TableCell>{app.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
