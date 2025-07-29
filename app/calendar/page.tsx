"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Clock,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { getAppointments } from "@/lib/database"
import { designSystem, getStatusBadgeStyle } from "@/lib/design-system"

interface Appointment {
  id: string
  appointment_date: string
  start_time: string
  end_time: string
  status: string
  students: { full_name: string }
  services: { name: string }
  instructors: { name: string }
  locations: { name: string }
}

export default function Calendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(1) // 1=week, 7=week, 30=month
  const [filterInstructor, setFilterInstructor] = useState("all")
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())

  useEffect(() => {
    async function loadAppointments() {
      setLoading(true)
      try {
        const data = await getAppointments(selectedPeriod)
        setAppointments(data as Appointment[])
      } catch (error) {
        console.error("Error loading appointments:", error)
      } finally {
        setLoading(false)
      }
    }
    loadAppointments()
  }, [selectedPeriod])

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getWeekDays = (startDate: Date) => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }
    return days
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentWeekStart(newDate)
  }

  const weekDays = getWeekDays(currentWeekStart)
  const todayString = new Date().toISOString().split('T')[0]

  const filteredAppointments = appointments.filter(appointment => {
    if (filterInstructor === "all") return true
    return appointment.instructors.name === filterInstructor
  })

  const groupedAppointments = weekDays.map(day => {
    const dayString = day.toISOString().split('T')[0]
    const dayAppointments = filteredAppointments.filter(
      appointment => appointment.appointment_date === dayString
    )
    return {
      date: day,
      dateString: dayString,
      appointments: dayAppointments
    }
  })

  const instructors = [...new Set(appointments.map(a => a.instructors.name))]
  const stats = {
    total: appointments.length,
    today: appointments.filter(a => a.appointment_date === todayString).length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
  }

  return (
    <div className={designSystem.layout.page}>
      {/* Enhanced Header */}
      <div className={designSystem.components.header.gradient}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                <CalendarIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">Calendar</h1>
              <p className="text-white/80 text-sm">{stats.total} appointments this period</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => (window.location.href = "/appointments/new")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className={`${designSystem.components.card.base} bg-blue-50 border border-blue-200`}>
            <CardContent className="p-4 text-center">
              <CalendarIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-blue-600 font-medium">Total</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-green-50 border border-green-200`}>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              <p className="text-sm text-green-600 font-medium">Today</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-purple-50 border border-purple-200`}>
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 mx-auto mb-2 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              <p className="text-sm text-purple-600 font-medium">Confirmed</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className={designSystem.components.card.primary}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Filter className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">Filters</span>
              </div>
              <div className="flex items-center space-x-3">
                <Select value={selectedPeriod.toString()} onValueChange={(value) => setSelectedPeriod(Number(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Today</SelectItem>
                    <SelectItem value="7">This Week</SelectItem>
                    <SelectItem value="30">This Month</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterInstructor} onValueChange={setFilterInstructor}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Instructors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Instructors</SelectItem>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor} value={instructor}>
                        {instructor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Week Navigation */}
        <Card className={designSystem.components.card.base}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigateWeek('prev')}
                className="text-purple-600 hover:bg-purple-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="text-center">
                <h3 className="font-bold text-gray-900">
                  {currentWeekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <p className="text-sm text-gray-600">
                  Week of {currentWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigateWeek('next')}
                className="text-purple-600 hover:bg-purple-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
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
        ) : (
          <div className="space-y-4">
            {groupedAppointments.map(({ date, dateString, appointments: dayAppointments }) => {
              const isToday = dateString === todayString
              return (
                <Card 
                  key={dateString} 
                  className={`${designSystem.components.card.base} ${
                    isToday ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isToday ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <span className="font-bold">{date.getDate()}</span>
                        </div>
                        <div>
                          <h3 className={`font-bold ${isToday ? 'text-purple-900' : 'text-gray-900'}`}>
                            {formatDate(dateString)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      {isToday && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          Today
                        </Badge>
                      )}
                    </div>

                    {dayAppointments.length > 0 ? (
                      <div className="space-y-3">
                        {dayAppointments.map((appointment) => (
                          <Card 
                            key={appointment.id} 
                            className={`${designSystem.components.card.elevated} hover:shadow-xl transition-all duration-200`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                  <Avatar className="h-10 w-10 bg-gradient-to-r from-purple-400 to-blue-400">
                                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold text-sm">
                                      {appointment.students.full_name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">
                                      {appointment.students.full_name}
                                    </h4>
                                    <p className="text-purple-600 font-medium text-sm">
                                      {appointment.services.name}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                      Instructor: {appointment.instructors.name}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Badge className={getStatusBadgeStyle(appointment.status)}>
                                      {appointment.status}
                                    </Badge>
                                    <Button 
                                      size="sm" 
                                      className={designSystem.components.button.success}
                                    >
                                      Edit
                                    </Button>
                                  </div>
                                  <p className="font-bold text-gray-900">
                                    {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No appointments scheduled</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}

            {appointments.length === 0 && (
              <Card className={designSystem.components.card.primary}>
                <CardContent className="p-8 text-center">
                  <CalendarIcon className={`${designSystem.icons.sizes.xxl} text-purple-400 mx-auto mb-4`} />
                  <p className="text-gray-600 text-lg font-medium">No appointments found for the selected timeframe</p>
                  <p className="text-gray-500 text-sm mt-2">Schedule your first appointment to get started!</p>
                  <Button 
                    className={`${designSystem.components.button.gradient} mt-4`}
                    onClick={() => (window.location.href = "/appointments/new")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <BottomNavigation currentPage="calendar" />
    </div>
  )
}
