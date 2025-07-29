"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Clock, Search, Users, Calendar, CheckCircle } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import {
  searchStudents,
  createAppointment,
  isAppointmentAvailable,
} from "@/lib/database"
import { designSystem } from "@/lib/design-system"

export default function NewAppointment() {
  const [step, setStep] = useState(1) // 1: Student, 2: Service, 3: Schedule, 4: Confirm
  const [studentQuery, setStudentQuery] = useState("")
  const [students, setStudents] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [selectedService, setSelectedService] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [confirmation, setConfirmation] = useState<any | null>(null)

  const services = [
    { id: "microblading", name: "Advanced Microblading", duration: "3 hours", price: 3500, category: "Premium" },
    { id: "volume-lashes", name: "Volume Lashes Course", duration: "3 hours", price: 2800, category: "Course" },
    { id: "microblading-touchup", name: "Microblading Touch-up", duration: "1 hour", price: 800, category: "Touch-up" },
    { id: "eyelash-application", name: "Eyelash Application", duration: "1.5 hours", price: 600, category: "Service" },
    { id: "eyebrow-shaping", name: "Eyebrow Shaping", duration: "30 minutes", price: 300, category: "Service" },
    { id: "consultation", name: "Consultation", duration: "30 minutes", price: 200, category: "Consultation" },
  ]

  const locations = [
    {
      id: "polanco",
      name: "Polanco",
      address: "Presidente Masaryk 456",
      instructor: "Carlos Rivera",
      phone: "+52 55 3333 4444",
    },
    {
      id: "ciudad-brisas",
      name: "Ciudad Brisas",
      address: "Av. Insurgentes Sur 123",
      instructor: "Sofia Mendez",
      phone: "+52 55 1111 2222",
    },
    {
      id: "pedregal",
      name: "Pedregal",
      address: "Periférico Sur 789",
      instructor: "Diana Herrera",
      phone: "+52 55 5555 6666",
    },
  ]

  useEffect(() => {
    async function load() {
      if (studentQuery.trim().length === 0) {
        setStudents([])
        return
      }
      try {
        const result = await searchStudents(studentQuery)
        setStudents(result as any[])
      } catch (err) {
        console.error("Error searching students", err)
      }
    }
    load()
  }, [studentQuery])

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Student"
      case 2:
        return "Choose Service"
      case 3:
        return "Schedule Time"
      case 4:
        return "Confirmation"
      default:
        return "New Appointment"
    }
  }

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return Users
      case 2:
        return Calendar
      case 3:
        return Clock
      case 4:
        return CheckCircle
      default:
        return Users
    }
  }

  const handleNext = async () => {
    if (step === 3) {
      const service = services.find((s) => s.id === selectedService)
      const location = locations.find((l) => l.id === selectedLocation)
      const durationMatch = service?.duration.match(/([0-9.]+)/)
      const hours = durationMatch ? parseFloat(durationMatch[1]) : 1
      const start = new Date(`${appointmentDate}T${startTime}`)
      const end = new Date(start.getTime() + hours * 60 * 60 * 1000)
      const endTime = `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`

      const available = await isAppointmentAvailable(
        appointmentDate,
        startTime,
        endTime,
        location?.name || "",
      )

      if (!available) {
        alert("Selected time slot is not available")
        return
      }

      const app = await createAppointment({
        student_id: selectedStudent!.id,
        instructor_id: "1",
        service_id: selectedService,
        location_id: selectedLocation,
        appointment_date: appointmentDate,
        start_time: startTime,
        end_time: endTime,
      })

      setConfirmation({
        ...app,
        student: selectedStudent,
        service,
        location,
      })
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedStudent !== null
      case 2:
        return selectedService !== ""
      case 3:
        return selectedLocation !== "" && appointmentDate !== "" && startTime !== ""
      default:
        return true
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  return (
    <div className={designSystem.layout.page}>
      {/* Enhanced Header */}
      <div className={designSystem.components.header.gradient}>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => (step > 1 ? setStep(step - 1) : window.history.back())}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                <Calendar className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">New Appointment</h1>
              <p className="text-white/80 text-sm">
                Step {step} of 4: {getStepTitle()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        {/* Enhanced Progress Indicator */}
        <Card className={designSystem.components.card.primary}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNum) => {
                const StepIcon = getStepIcon(stepNum)
                const isCompleted = stepNum < step
                const isCurrent = stepNum === step
                return (
                  <div key={stepNum} className="flex flex-col items-center flex-1">
                    <div className="flex items-center w-full">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          isCompleted 
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                            : isCurrent
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isCompleted ? "✓" : <StepIcon className="h-5 w-5" />}
                      </div>
                      {stepNum < 4 && (
                        <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                          stepNum < step ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gray-200"
                        }`} />
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium transition-all duration-300 ${
                      isCurrent ? "text-purple-600" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}>
                      {getStepTitle().split(' ')[stepNum === 1 ? 1 : stepNum === 2 ? 0 : stepNum === 3 ? 0 : 0]}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Search Student */}
        {step === 1 && (
          <div className={designSystem.layout.section}>
            <Card className={designSystem.components.card.base}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Find Student</h2>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter student name to search..."
                    value={studentQuery}
                    onChange={(e) => setStudentQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  {students.map((student) => (
                    <Card
                      key={student.id}
                      className={`${designSystem.components.card.elevated} cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                        selectedStudent?.id === student.id ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50' : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12 bg-gradient-to-r from-purple-400 to-blue-400">
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                              {student.full_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{student.full_name}</h3>
                            <p className="text-purple-600 font-medium text-sm">{student.services?.name}</p>
                            <p className="text-gray-500 text-sm">{student.phone}</p>
                          </div>
                          {selectedStudent?.id === student.id && (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {studentQuery && students.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No students found matching "{studentQuery}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Select Service */}
        {step === 2 && (
          <div className={designSystem.layout.section}>
            <Card className={designSystem.components.card.base}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Choose a Service</h2>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={`${designSystem.components.card.elevated} cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                        selectedService === service.id ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50' : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">{service.name}</h3>
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                {service.category}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600 font-medium">{service.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">{formatCurrency(service.price)}</p>
                            {selectedService === service.id && (
                              <CheckCircle className="h-6 w-6 text-green-500 ml-auto mt-2" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === 3 && (
          <div className={designSystem.layout.section}>
            <Card className={designSystem.components.card.base}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Schedule Appointment</h2>
                </div>

                <div className="space-y-6">
                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900" htmlFor="appointmentDate">Date</label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900" htmlFor="startTime">Start Time</label>
                      <Input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Location Selection */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Select Location</h3>
                    <div className="space-y-3">
                      {locations.map((location) => (
                        <Card
                          key={location.id}
                          className={`${designSystem.components.card.elevated} cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                            selectedLocation === location.id ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50' : 'hover:shadow-lg'
                          }`}
                          onClick={() => setSelectedLocation(location.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                  <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-gray-900 text-lg">{location.name}</h3>
                                  <p className="text-gray-600 text-sm">{location.address}</p>
                                  <p className="text-purple-600 font-medium text-sm">Instructor: {location.instructor}</p>
                                  <div className="flex items-center space-x-1 mt-1">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span className="text-sm text-gray-500">{location.phone}</span>
                                  </div>
                                </div>
                              </div>
                              {selectedLocation === location.id && (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && confirmation && (
          <div className={designSystem.layout.section}>
            <Card className={`${designSystem.components.card.primary} text-center`}>
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-600 mb-6">Confirmation #{confirmation.id}</p>

                <div className="space-y-4 text-left">
                  <Card className={designSystem.components.card.base}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 bg-gradient-to-r from-purple-400 to-blue-400">
                          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                            {confirmation.student.full_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-gray-900">{confirmation.student.full_name}</h3>
                          <p className="text-purple-600 font-medium">{confirmation.service.name}</p>
                          <p className="text-gray-600 text-sm">
                            {confirmation.appointment_date} • {confirmation.start_time} - {confirmation.end_time}
                          </p>
                          <p className="text-gray-600 text-sm">{confirmation.location.name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  className={`${designSystem.components.button.success} w-full mt-6`}
                  onClick={() => {
                    const shareText = `Appointment confirmed!\n${confirmation.student.full_name}\n${confirmation.service.name}\n${confirmation.appointment_date} ${confirmation.start_time}\n${confirmation.location.name}`
                    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
                  }}
                >
                  Share via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="pt-6">
            <Button 
              className={`w-full ${designSystem.components.button.gradient} h-14 text-lg font-semibold`} 
              onClick={handleNext} 
              disabled={!canProceed()}
            >
              {step === 3 ? "Complete Booking" : "Continue"}
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="pt-6">
            <Button 
              className={`w-full ${designSystem.components.button.primary} h-14 text-lg font-semibold`}
              onClick={() => window.location.href = "/calendar"}
            >
              View Calendar
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation currentPage="calendar" />
    </div>
  )
}
