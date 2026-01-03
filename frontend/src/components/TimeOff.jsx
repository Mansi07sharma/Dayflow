import React from 'react'
import { Search, Plus, User, Check, X } from "lucide-react";
import Layout from "../ui/Layout"; 
import Button from "../ui/Button"; 
import Input from "../ui/Input"; 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/Select";
const leaveRequests = [
  {
    id: 1,
    name: "Michael Chen",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    leaveType: "paid",
    status: "approved",
  },
  {
    id: 2,
    name: "Amanda White",
    startDate: "2024-01-15",
    endDate: "2024-01-16",
    leaveType: "sick",
    status: "approved",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    leaveType: "paid",
    status: "pending",
  },
  {
    id: 4,
    name: "Jessica Martinez",
    startDate: "2024-01-18",
    endDate: "2024-01-18",
    leaveType: "sick",
    status: "pending",
  },
  {
    id: 5,
    name: "Robert Taylor",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    leaveType: "paid",
    status: "pending",
  },
];
const TimeOff = () => {
  return (
     <Layout>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Time Off Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage leave requests</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          NEW
        </Button>
      </div>

      {/* Filter/Search */}
      <div className="section-card mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="bg-secondary border-border sm:w-64">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="paid">Paid Leave</SelectItem>
              <SelectItem value="sick">Sick Leave</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-10 bg-secondary border-border" />
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="section-card overflow-x-auto">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="icon-box icon-box-primary h-8 w-8 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{request.name}</span>
                  </div>
                </td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>
                  <span
                    className={`status-badge ${
                      request.leaveType === "paid"
                        ? "bg-primary/20 text-primary"
                        : "bg-warning/20 text-warning"
                    }`}
                  >
                    {request.leaveType === "paid" ? "Paid" : "Sick"}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      request.status === "approved" ? "status-approved" : "status-pending"
                    }`}
                  >
                    {request.status === "approved" ? "Approved" : "Pending"}
                  </span>
                </td>
                <td>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button className="h-8 w-8 bg-success hover:bg-success/90 p-2">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button className="h-8 w-8 bg-red-500 hover:bg-red-600 p-2">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default TimeOff
