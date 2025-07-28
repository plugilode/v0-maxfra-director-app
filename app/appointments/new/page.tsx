"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import {
  searchStudents,
  createAppointment,
  isAppointmentAvailable,
} from "@/lib/database"

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
    { id: "microblading", name: "Advanced Microblading", duration: "3 hours", price: 3500 },
    { id: "volume-lashes", name: "Volume Lashes Course", duration: "3 hours", price: 2800 },
    { id: "microblading-touchup", name: "Microblading Touch-up", duration: "1 hour", price: 800 },
    { id: "eyelash-application", name: "Eyelash Application", duration: "1.5 hours", price: 600 },
    { id: "eyebrow-shaping", name: "Eyebrow Shaping", duration: "30 minutes", price: 300 },
    { id: "consultation", name: "Consultation", duration: "30 minutes", price: 200 },
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
        return "Select Service"
      case 3:
        return "Schedule"
      case 4:
        return "Confirmation"
      default:
        return "New Appointment"
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => (step > 1 ? setStep(step - 1) : window.history.back())}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-gray-900">New Appointment</h1>
            <p className="text-sm text-gray-500">
              Step {step} of 4: {getStepTitle()}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-8 h-1 mx-2 ${stepNum < step ? "bg-purple-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Search Student */}
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Student</h2>
            <Input
              placeholder="Enter student name"
              value={studentQuery}
              onChange={(e) => setStudentQuery(e.target.value)}
            />
            <div className="space-y-2">
              {students.map((student) => (
                <Card
                  key={student.id}
                  className={`border-0 shadow-sm cursor-pointer transition-colors ${
                    selectedStudent?.id === student.id ? "bg-purple-50 border-purple-200" : ""
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <CardContent className="p-3">{student.full_name}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Service */}
        {step === 2 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Service</h2>
            {services.map((service) => (
              <Card
                key={service.id}
                className={`border-0 shadow-sm cursor-pointer transition-colors ${
                  selectedService === service.id ? "bg-purple-50 border-purple-200" : ""
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">${service.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}


        {/* Step 3: Schedule */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="appointmentDate">Date</label>
              <Input
                id="appointmentDate"
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="startTime">Start Time</label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Location</h3>
              {locations.map((location) => (
                <Card
                  key={location.id}
                  className={`border-0 shadow-sm cursor-pointer transition-colors ${
                    selectedLocation === location.id ? "bg-purple-50 border-purple-200" : ""
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.address}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{location.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && confirmation && (
          <div className="space-y-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">Appointment Confirmed</h2>
            <p className="text-sm text-gray-600">Confirmation #{confirmation.id}</p>
            <p className="text-sm text-gray-600">{confirmation.student.full_name}</p>
            <p className="text-sm text-gray-600">{confirmation.service.name}</p>
            <p className="text-sm text-gray-600">
              {confirmation.appointment_date} {confirmation.start_time} - {confirmation.end_time}
            </p>
            <p className="text-sm text-gray-600">{confirmation.location.name}</p>
            <a
              className="block bg-green-600 text-white py-2 rounded-md"
              href={`https://wa.me/?text=${encodeURIComponent(
                `Appointment confirmed!\n${confirmation.student.full_name}\n${confirmation.service.name}\n${confirmation.appointment_date} ${confirmation.start_time}\n${confirmation.location.name}`,
              )}`}
            >
              Share via WhatsApp
            </a>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6">
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleNext} disabled={!canProceed()}>
            {step === 3 ? "Complete Booking" : step === 4 ? "Finish" : "Continue"}
          </Button>
        </div>
      </div>

      <BottomNavigation currentPage="calendar" />
    </div>
  )
}
