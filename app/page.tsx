"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  CalendarDays,
  UserPlus,
  Plus,
  Receipt,
  GraduationCap,
  Eye,
  Bell,
  Search,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { getDashboardStats, getTodaysAppointments } from "@/lib/database"

interface DashboardStats {
  totalStudents: number
  todaysClasses: number
  monthlyRevenue: number
  satisfaction: number
}

interface TodaysAppointment {
  id: string
  start_time: string
  end_time: string
  status: string
  students: { full_name: string }
  services: { name: string }
  instructors: { name: string }
  locations: { name: string }
}

export default function Dashboard() {
  const [notifications] = useState(4)
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    todaysClasses: 0,
    monthlyRevenue: 0,
    satisfaction: 0,
  })
  const [todaysAppointments, setTodaysAppointments] = useState<TodaysAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, appointmentsData] = await Promise.all([getDashboardStats(), getTodaysAppointments()])

        setStats(statsData)
        setTodaysAppointments(appointmentsData as TodaysAppointment[])
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("es-MX", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const dashboardStats = [
    {
      title: "Total Students",
      value: loading ? "..." : stats.totalStudents.toString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Today's Classes",
      value: loading ? "..." : stats.todaysClasses.toString(),
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: loading ? "..." : formatCurrency(stats.monthlyRevenue),
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Satisfaction",
      value: loading ? "..." : `${stats.satisfaction}%`,
      icon: Star,
      color: "text-orange-600",
    },
  ]

  const quickActions = [
    {
      title: "Calendar",
      icon: CalendarDays,
      color: "bg-blue-500 hover:bg-blue-600",
      href: "/calendar",
    },
    {
      title: "New Appointment",
      icon: Plus,
      color: "bg-green-500 hover:bg-green-600",
      href: "/appointments/new",
    },
    {
      title: "Add Student",
      icon: UserPlus,
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/students/new",
    },
    {
      title: "Create Receipt",
      icon: Receipt,
      color: "bg-orange-500 hover:bg-orange-600",
      href: "/receipts/new",
    },
    {
      title: "Generate Diploma",
      icon: GraduationCap,
      color: "bg-pink-500 hover:bg-pink-600",
      href: "/diplomas",
    },
    {
      title: "View Students",
      icon: Eye,
      color: "bg-blue-600 hover:bg-blue-700",
      href: "/students",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-purple-600">
              <AvatarFallback className="bg-purple-600 text-white font-semibold">M</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-gray-900">MAXFRA</h1>
              <p className="text-sm text-gray-500">Director Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </div>
            <Search className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                className={`${action.color} text-white h-20 flex flex-col items-center justify-center space-y-2`}
                onClick={() => (window.location.href = action.href)}
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            <Button variant="ghost" size="sm" className="text-purple-600">
              View All
            </Button>
          </div>

          {loading ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          ) : todaysAppointments.length > 0 ? (
            <div className="space-y-3">
              {todaysAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{appointment.students.full_name}</h3>
                        <p className="text-sm text-gray-600">{appointment.services.name}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.instructors.name} • {appointment.locations.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled for today</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation currentPage="dashboard" />
    </div>
  )
}
