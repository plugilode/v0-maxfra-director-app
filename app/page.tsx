"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  CalendarDays,
  UserPlus,
  Plus,
  Bell,
  Search,
  TrendingUp,
  Sparkles,
  Users,
  MapPin,
  GraduationCap,
  FileText,
  Settings,
  Star,
  BookOpen,
  CreditCard,
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
      change: "+12%",
      bgImage: "/images/students-group-1.png",
      gradient: "from-purple-600/90 via-purple-700/90 to-pink-600/90",
    },
    {
      title: "Today's Classes",
      value: loading ? "..." : stats.todaysClasses.toString(),
      change: "+8%",
      bgImage: "/images/students-group-2.png",
      gradient: "from-blue-600/90 via-purple-600/90 to-purple-700/90",
    },
    {
      title: "Monthly Revenue",
      value: loading ? "..." : formatCurrency(stats.monthlyRevenue),
      change: "+24%",
      bgImage: "/images/woman-laptop.png",
      gradient: "from-purple-700/90 via-pink-600/90 to-purple-800/90",
    },
    {
      title: "Satisfaction",
      value: loading ? "..." : `${stats.satisfaction}%`,
      change: "+5%",
      bgImage: "/images/woman-headphones.png",
      gradient: "from-blue-500/90 via-cyan-500/90 to-teal-500/90",
    },
  ]

  // Main action buttons - larger and more prominent
  const mainActions = [
    {
      title: "Calendar",
      subtitle: "View Schedule",
      icon: CalendarDays,
      gradient: "from-blue-500 to-blue-600",
      href: "/calendar",
    },
    {
      title: "Students",
      subtitle: "Manage Students",
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      href: "/students",
    },
    {
      title: "Documents",
      subtitle: "Diplomas & Receipts",
      icon: FileText,
      gradient: "from-emerald-500 to-green-600",
      href: "/documents",
    },
    {
      title: "Services",
      subtitle: "Courses & Pricing",
      icon: BookOpen,
      gradient: "from-orange-500 to-red-500",
      href: "/services",
    },
  ]

  // Quick action buttons - smaller secondary actions
  const quickActions = [
    {
      title: "New Appointment",
      icon: Plus,
      gradient: "from-cyan-500 to-blue-500",
      href: "/appointments/new",
    },
    {
      title: "Add Student",
      icon: UserPlus,
      gradient: "from-pink-500 to-purple-500",
      href: "/students/new",
    },
    {
      title: "Create Receipt",
      icon: CreditCard,
      gradient: "from-green-500 to-emerald-500",
      href: "/documents/receipts",
    },
    {
      title: "Generate Diploma",
      icon: GraduationCap,
      gradient: "from-indigo-500 to-purple-500",
      href: "/diplomas",
    },
  ]

  const recentStudents = [
    {
      id: 1,
      name: "Emma Rodriguez",
      program: "Microblading Certification",
      progress: 85,
      status: "active",
      avatar: "/images/student-1.png",
    },
    {
      id: 2,
      name: "Sophia Kim",
      program: "Volume Lashes Course",
      progress: 92,
      status: "active",
      avatar: "/images/student-2.png",
    },
    {
      id: 3,
      name: "Isabella Chen",
      program: "Henna Specialist",
      progress: 78,
      status: "active",
      avatar: "/images/student-3.png",
    },
  ]

  const quickStats = [
    {
      label: "This Week",
      value: "32",
      subtitle: "Appointments",
      icon: Calendar,
      color: "text-blue-400",
    },
    {
      label: "Active",
      value: "8",
      subtitle: "Students",
      icon: Users,
      color: "text-emerald-400",
    },
    {
      label: "Completed",
      value: "156",
      subtitle: "This Month",
      icon: Star,
      color: "text-yellow-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pb-20">
      {/* Modern Header */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-4 border-white/20 shadow-xl">
                <AvatarImage src="/images/profile-photo.png" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white shadow-lg"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">MAXFRA</h1>
              <p className="text-lg text-white/80 font-medium">Director Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/10 rounded-full text-white">
                <Bell className="h-6 w-6" />
                {notifications > 0 && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs text-white font-bold">{notifications}</span>
                  </div>
                )}
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full text-white">
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl h-48 shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${stat.bgImage})` }}
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`} />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold leading-tight">{stat.title}</h3>
                  <div className="flex items-center space-x-1 bg-emerald-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <TrendingUp className="h-3 w-3 text-emerald-300" />
                    <span className="text-xs font-bold text-emerald-300">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-1">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <div>
                <p className="text-white/80 font-medium text-sm">{stat.label}</p>
                <p className="text-white/60 text-xs">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Navigation Actions - Like your example */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Main Menu</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {mainActions.map((action, index) => (
              <button
                key={index}
                className={`relative overflow-hidden h-32 bg-gradient-to-br ${action.gradient} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 p-6 text-left`}
                onClick={() => (window.location.href = action.href)}
              >
                <div className="relative z-10 h-full flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <action.icon className="h-8 w-8" />
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                    <p className="text-white/80 text-sm font-medium">{action.subtitle}</p>
                  </div>
                </div>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-white/5"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions - Smaller buttons */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Plus className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`h-20 bg-gradient-to-r ${action.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-2xl border-0 flex items-center justify-center space-x-3`}
                onClick={() => (window.location.href = action.href)}
              >
                <action.icon className="h-6 w-6" />
                <span className="font-semibold text-sm">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Today's Schedule</h2>
            </div>
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 font-semibold rounded-xl"
              onClick={() => (window.location.href = "/calendar")}
            >
              View All
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="animate-pulse">
                    <div className="h-4 bg-white/20 rounded-lg w-3/4 mb-3"></div>
                    <div className="h-3 bg-white/20 rounded-lg w-1/2 mb-2"></div>
                    <div className="h-2 bg-white/20 rounded-lg w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : todaysAppointments.length > 0 ? (
            <div className="space-y-4">
              {todaysAppointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{appointment.students.full_name}</h3>
                      <p className="text-white/80 font-semibold mb-1">{appointment.services.name}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-white/60" />
                          <span className="text-sm text-white/60">{appointment.instructors.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-white/60" />
                          <span className="text-sm text-white/60">{appointment.locations.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white text-lg mb-1">
                        {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                      </p>
                      <Badge
                        className={`${
                          appointment.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        } backdrop-blur-sm`}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white/60" />
              </div>
              <p className="text-white/80 font-medium">No appointments scheduled for today</p>
            </div>
          )}
        </div>

        {/* Recent Students */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Recent Students</h2>
            </div>
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 font-semibold rounded-xl"
              onClick={() => (window.location.href = "/students")}
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentStudents.map((student) => (
              <div key={student.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-white/20">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{student.name}</h3>
                      <p className="text-white/80 text-sm">{student.program}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-white font-bold">{student.progress}%</span>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-sm">
                        {student.status}
                      </Badge>
                    </div>
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Access */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-bold text-white">System</h2>
          </div>

          <button
            className="w-full h-16 bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-2xl flex items-center justify-between px-6"
            onClick={() => (window.location.href = "/settings")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 rounded-xl">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Settings & Configuration</h3>
                <p className="text-white/60 text-sm">Customize your MAXFRA experience</p>
              </div>
            </div>
            <div className="text-white/40">→</div>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50"
        onClick={() => (window.location.href = "/appointments/new")}
      >
        <Plus className="h-8 w-8" />
      </button>

      <BottomNavigation currentPage="dashboard" />
    </div>
  )
}
