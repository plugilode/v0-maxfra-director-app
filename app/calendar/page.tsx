"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Plus, CalendarIcon } from "lucide-react"
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
    { value: "1", label: "1 Day" },
    { value: "3", label: "3 Days" },
    { value: "5", label: "5 Days" },
    { value: "7", label: "7 Days" },
    { value: "10", label: "10 Days" },
    { value: "14", label: "14 Days" },
    { value: "30", label: "30 Days" },
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
        return "bg-purple-100 text-purple-800"
      case "Ciudad Brisas":
        return "bg-blue-100 text-blue-800"
      case "Perisur":
        return "bg-green-100 text-green-800"
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">Calendar</h1>
              <p className="text-sm text-gray-500">Appointments Overview</p>
            </div>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => (window.location.href = "/appointments/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Book
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Timeframe Selection */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">View Appointments</h3>
          <div className="flex flex-wrap gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.value}
                variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                size="sm"
                className={selectedTimeframe === timeframe.value ? "bg-purple-600 hover:bg-purple-700" : ""}
                onClick={() => setSelectedTimeframe(timeframe.value)}
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Next {selectedTimeframe} Days</h2>
                <p className="text-sm text-gray-600">{appointments.length} appointments scheduled</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments by Day */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(appointmentsByDay).map(([date, dayAppointments]) => (
              <div key={date}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{formatDate(date)}</h3>
                    {date === new Date().toISOString().split("T")[0] && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Today</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{dayAppointments.length} appointments</p>
                </div>

                {/* Group appointments by location */}
                {dayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {Array.from(new Set(dayAppointments.map((apt) => apt.locations.name))).map((location) => {
                      const locationAppointments = dayAppointments.filter((apt) => apt.locations.name === location)
                      const locationInfo = locationAppointments[0].locations

                      return (
                        <Card key={location} className="border-0 shadow-sm">
                          <CardContent className="p-4">
                            {/* Location Header */}
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                              <div className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-purple-600" />
                                <div>
                                  <h4 className="font-semibold text-gray-900">{location}</h4>
                                  <p className="text-sm text-gray-600">{locationInfo.address}</p>
                                  <div className="flex items-center space-x-1 mt-1">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span className="text-sm text-gray-600">{locationInfo.phone}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge className={`${getLocationColor(location)} text-xs`}>
                                {locationAppointments.length} appointments
                              </Badge>
                            </div>

                            {/* Appointments for this location */}
                            <div className="space-y-3">
                              {locationAppointments.map((appointment) => (
                                <div key={appointment.id} className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-gray-900">
                                      {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                    </h5>
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        className={`text-xs ${
                                          appointment.status === "confirmed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                      >
                                        {appointment.status}
                                      </Badge>
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1">
                                        Edit
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="bg-white rounded p-2">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium text-gray-900 text-sm">
                                          {appointment.students.full_name}
                                        </p>
                                        <p className="text-xs text-gray-600">{appointment.services.name}</p>
                                        <p className="text-xs text-gray-500">
                                          Instructor: {appointment.instructors.name}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No appointments scheduled for this day</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {appointments.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No appointments found for the selected timeframe</p>
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
