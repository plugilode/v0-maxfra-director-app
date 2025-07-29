"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Plus, CalendarIcon, Clock, Users } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { getAppointments } from "@/lib/database"

interface Appointment {
  id: string
  appointment_date: string
  start_time: string
  end_time: string
  status: string
  students: { full_name: string }
  services: { name: string }
  instructors: { name: string }
  locations: { name: string; address: string; phone: string }
}

export default function Calendar() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const timeframes = [
    { value: "1", label: "1 Day", color: "from-blue-500 to-blue-600" },
    { value: "3", label: "3 Days", color: "from-emerald-500 to-emerald-600" },
    { value: "5", label: "5 Days", color: "from-purple-500 to-purple-600" },
    { value: "7", label: "7 Days", color: "from-pink-500 to-pink-600" },
    { value: "10", label: "10 Days", color: "from-orange-500 to-orange-600" },
    { value: "14", label: "14 Days", color: "from-indigo-500 to-indigo-600" },
    { value: "30", label: "30 Days", color: "from-red-500 to-red-600" },
  ]

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await getAppointments(Number.parseInt(selectedTimeframe))
        setAppointments(data as Appointment[])
      } catch (error) {
        console.error("Error loading appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [selectedTimeframe])

  const getLocationColor = (location: string) => {
    switch (location) {
      case "Polanco":
        return "badge-purple"
      case "Ciudad Brisas":
        return "badge-info"
      case "Perisur":
        return "badge-success"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("es-MX", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return (
        "Today - " +
        date.toLocaleDateString("es-MX", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return (
        "Tomorrow - " +
        date.toLocaleDateString("es-MX", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    } else {
      return date.toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }

  // Group appointments by date
  const appointmentsByDay = appointments.reduce(
    (acc, appointment) => {
      const date = appointment.appointment_date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(appointment)
      return acc
    },
    {} as Record<string, Appointment[]>,
  )

  return (
    <div className="min-h-screen pb-20 fade-in">
      {/* Modern Header */}
      <div className="glass-card border-0 border-b border-white/20 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="hover:bg-purple-50 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gradient">Calendar</h1>
              <p className="text-sm text-gray-600 font-medium">Appointments Overview</p>
            </div>
          </div>
          <Button className="btn-success rounded-xl" onClick={() => (window.location.href = "/appointments/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Book
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Timeframe Selection */}
        <div className="slide-up">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">View Appointments</h3>
          <div className="flex flex-wrap gap-3">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.value}
                variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                size="sm"
                className={
                  selectedTimeframe === timeframe.value
                    ? `bg-gradient-to-r ${timeframe.color} text-white shadow-lg hover:shadow-xl border-0 rounded-xl font-semibold`
                    : "btn-secondary rounded-xl"
                }
                onClick={() => setSelectedTimeframe(timeframe.value)}
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Summary Card */}
        <div className="stat-card slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                <CalendarIcon className="h-6 w-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Next {selectedTimeframe} Days</h2>
                <p className="text-gray-600 font-medium">{appointments.length} appointments scheduled</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {appointments.length}
              </p>
              <p className="text-sm text-gray-500 font-medium">Total</p>
            </div>
          </div>
        </div>

        {/* Enhanced Appointments by Day */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="modern-card p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                    <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(appointmentsByDay).map(([date, dayAppointments], dayIndex) => (
              <div key={date} className="slide-up" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                      <CalendarIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{formatDate(date)}</h3>
                      {date === new Date().toISOString().split("T")[0] && (
                        <Badge className="badge-success mt-1">Today</Badge>
                      )}
                    </div>
                  </div>
                  <Badge className="badge-info">{dayAppointments.length} appointments</Badge>
                </div>

                {/* Group appointments by location */}
                {dayAppointments.length > 0 ? (
                  <div className="space-y-6">
                    {Array.from(new Set(dayAppointments.map((apt) => apt.locations.name))).map((location) => {
                      const locationAppointments = dayAppointments.filter((apt) => apt.locations.name === location)
                      const locationInfo = locationAppointments[0].locations

                      return (
                        <div key={location} className="modern-card p-6 bounce-in">
                          {/* Enhanced Location Header */}
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                                <MapPin className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{location}</h4>
                                <p className="text-gray-600 font-medium">{locationInfo.address}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600 font-medium">{locationInfo.phone}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={getLocationColor(location)}>
                              {locationAppointments.length} appointments
                            </Badge>
                          </div>

                          {/* Enhanced Appointments for this location */}
                          <div className="space-y-4">
                            {locationAppointments.map((appointment) => (
                              <div
                                key={appointment.id}
                                className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl p-4 border border-gray-100/50"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg bg-white shadow-sm">
                                      <Clock className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <h5 className="font-bold text-gray-900">
                                      {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                    </h5>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Badge
                                      className={appointment.status === "confirmed" ? "badge-success" : "badge-warning"}
                                    >
                                      {appointment.status}
                                    </Badge>
                                    <Button size="sm" className="btn-success text-xs px-3 py-1 rounded-lg">
                                      Edit
                                    </Button>
                                  </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                                        <Users className="h-4 w-4 text-purple-600" />
                                      </div>
                                      <div>
                                        <p className="font-bold text-gray-900">{appointment.students.full_name}</p>
                                        <p className="text-purple-600 font-semibold text-sm">
                                          {appointment.services.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                          Instructor:{" "}
                                          <span className="font-medium">{appointment.instructors.name}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="modern-card p-12 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No appointments scheduled for this day</p>
                  </div>
                )}
              </div>
            ))}

            {appointments.length === 0 && (
              <div className="modern-card p-12 text-center slide-up">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Appointments Found</h3>
                <p className="text-gray-500 font-medium">No appointments found for the selected timeframe</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="btn-floating" onClick={() => (window.location.href = "/appointments/new")}>
        <Plus className="h-6 w-6" />
      </button>

      <BottomNavigation currentPage="calendar" />
    </div>
  )
}
