import React from 'react'
import Layout from "../ui/Layout.jsx"  
import { Search, ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"; 
import Input from '../ui/Input'
import Button from '../ui/Button.jsx'

const attendanceRecords = [
  {
    id: 1,
    name: "Sarah Johnson",
    checkIn: "09:00",
    checkOut: "18:30",
    workHours: "8.5h",
    extraHours: "0.5h",
  },
  {
    id: 2,
    name: "Michael Chen",
    checkIn: "08:45",
    checkOut: "17:15",
    workHours: "8.5h",
    extraHours: "0.5h",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    checkIn: "09:15",
    checkOut: "18:00",
    workHours: "8.75h",
    extraHours: "0.75h",
  },
  {
    id: 4,
    name: "David Kim",
    checkIn: null,
    checkOut: null,
    workHours: "0h",
    extraHours: "0h",
  },
  {
    id: 5,
    name: "Jessica Martinez",
    checkIn: "08:30",
    checkOut: "17:30",
    workHours: "9h",
    extraHours: "1h",
  },
  {
    id: 6,
    name: "Robert Taylor",
    checkIn: "09:00",
    checkOut: "18:00",
    workHours: "9h",
    extraHours: "1h",
  },
];

export default function Attendance() {
  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage employee attendance
        </p>
      </div>

      {/* Filter/Search Section */}
      <div className="section-card mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2 flex-1 sm:max-w-xs">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">01/15/2024</span>
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-10 bg-secondary border-border" />
          </div>
          <div className="flex gap-2">
            <Button className="p-2" variant="ghost">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className="p-2" variant="ghost">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="section-card overflow-x-auto">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Work Hours</th>
              <th>Extra Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="icon-box icon-box-primary h-8 w-8 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{record.name}</span>
                  </div>
                </td>
                <td className="text-primary">{record.checkIn || "-"}</td>
                <td className="text-primary">{record.checkOut || "-"}</td>
                <td className="text-primary">{record.workHours}</td>
                <td className="text-success">{record.extraHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
