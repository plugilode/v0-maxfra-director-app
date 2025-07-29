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
import { designSystem, getStatusBadgeStyle, getStatCardStyle } from "@/lib/design-system"

interface DashboardStats {
  totalStudents: number
  todaysClasses: number
  monthlyRevenue: number
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
  })
  const [todaysAppointments, setTodaysAppointments] = useState<TodaysAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, appointmentsData] = await Promise.all([
          getDashboardStats(),
          getTodaysAppointments(),
        ])
        setStats(statsData)
        setTodaysAppointments(appointmentsData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
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
      description: "Active enrollments",
    },
    {
      title: "Today's Classes",
      value: loading ? "..." : stats.todaysClasses.toString(),
      icon: Calendar,
      description: "Scheduled sessions",
    },
    {
      title: "Monthly Revenue",
      value: loading ? "..." : formatCurrency(stats.monthlyRevenue),
      icon: DollarSign,
      description: "This month's earnings",
    },
    {
      title: "Success Rate",
      value: "92%",
      icon: Star,
      description: "Course completion",
    },
  ]

  const quickActions = [
    {
      title: "Calendar",
      icon: CalendarDays,
      color: designSystem.components.button.secondary,
      href: "/calendar",
    },
    {
      title: "New Appointment",
      icon: Plus,
      color: designSystem.components.button.success,
      href: "/appointments/new",
    },
    {
      title: "Add Student",
      icon: UserPlus,
      color: designSystem.components.button.primary,
      href: "/students/new",
    },
    {
      title: "Create Receipt",
      icon: Receipt,
      color: designSystem.components.button.warning,
      href: "/receipts/new",
    },
    {
      title: "Generate Diploma",
      icon: GraduationCap,
      color: designSystem.components.button.danger,
      href: "/diplomas",
    },
    {
      title: "View Students",
      icon: Eye,
      color: designSystem.components.button.gradient,
      href: "/students",
    },
  ]

  return (
    <div className={designSystem.layout.page}>
      {/* Enhanced Header with Gradient */}
      <div className={designSystem.components.header.gradient}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">M</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">MAXFRA</h1>
              <p className="text-white/80 text-sm">Beauty Academy Director</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-white/80" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center p-0 text-white border-2 border-white">
                  {notifications}
                </Badge>
              )}
            </div>
            <Search className="h-6 w-6 text-white/80" />
          </div>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {dashboardStats.map((stat, index) => {
            const style = getStatCardStyle(index)
            return (
              <Card key={index} className={`${designSystem.components.card.base} ${style.bgColor} border ${style.borderColor}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`${designSystem.icons.sizes.xl} ${style.color}`} />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{stat.title}</p>
                    <p className="text-xs text-gray-600">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enhanced Quick Actions */}
        <div className={designSystem.layout.section}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-purple-200 via-blue-200 to-transparent rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                className={`${action.color} h-auto py-4 flex flex-col items-center justify-center space-y-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                onClick={() => (window.location.href = action.href)}
              >
                <action.icon className={designSystem.icons.sizes.lg} />
                <span>{action.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Today's Schedule */}
        <div className={designSystem.layout.section}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-purple-200 via-blue-200 to-transparent rounded"></div>
            <Button variant="ghost" size="sm" className={designSystem.colors.primary.text}>
              View All
            </Button>
          </div>

          {loading ? (
            <Card className={designSystem.components.card.primary}>
              <CardContent className="p-8 text-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-purple-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-blue-200 rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-purple-200 rounded w-2/3 mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          ) : todaysAppointments.length > 0 ? (
            <div className="space-y-3">
              {todaysAppointments.map((appointment) => (
                <Card key={appointment.id} className={`${designSystem.components.card.elevated} hover:shadow-xl transition-shadow duration-200`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="h-8 w-8 bg-gradient-to-r from-purple-400 to-blue-400">
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-xs font-semibold">
                              {appointment.students.full_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-gray-900">{appointment.students.full_name}</h3>
                        </div>
                        <p className="text-sm text-purple-600 font-medium">{appointment.services.name}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.instructors.name} • {appointment.locations.name}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-bold text-gray-900 text-lg">
                          {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                        </p>
                        <Badge className={getStatusBadgeStyle(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className={designSystem.components.card.primary}>
              <CardContent className="p-8 text-center">
                <Calendar className={`${designSystem.icons.sizes.xxl} text-purple-400 mx-auto mb-4`} />
                <p className="text-gray-600 text-lg font-medium">No appointments scheduled for today</p>
                <p className="text-gray-500 text-sm mt-2">Perfect time to plan ahead!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation currentPage="dashboard" />
    </div>
  )
}
