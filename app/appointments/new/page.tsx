"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Phone, Clock, Users } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function NewAppointment() {
  const [step, setStep] = useState(1) // 1: Select Service, 2: Select Location, 3: Select Time
  const [selectedService, setSelectedService] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")

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

  const timeSlots = [
    {
      time: "10:00 AM - 1:00 PM",
      duration: "3 hours",
      instructor: "Fer",
      available: 2,
      total: 4,
    },
    {
      time: "1:00 PM - 3:00 PM",
      duration: "2 hours",
      instructor: "Fer, Ashley",
      available: 4,
      total: 4,
    },
    {
      time: "3:00 PM - 5:00 PM",
      duration: "2 hours",
      instructor: "Fer, Maggy, Ashley",
      available: 4,
      total: 4,
    },
    {
      time: "5:00 PM - 8:00 PM",
      duration: "3 hours",
      instructor: "Maggy, Pao, Ashley",
      available: 4,
      total: 4,
    },
  ]

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Service"
      case 2:
        return "Select Location"
      case 3:
        return "Select Time Slot"
      default:
        return "New Appointment"
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle booking completion
      console.log("Booking completed:", { selectedService, selectedLocation, selectedTimeSlot })
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService !== ""
      case 2:
        return selectedLocation !== ""
      case 3:
        return selectedTimeSlot !== ""
      default:
        return false
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
              Step {step} of 3: {getStepTitle()}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && <div className={`w-8 h-1 mx-2 ${stepNum < step ? "bg-purple-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
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

        {/* Step 2: Select Location */}
        {step === 2 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Location</h2>
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
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-xs bg-gray-200">
                              {location.instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{location.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{location.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 3: Select Time Slot */}
        {step === 3 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Time Slot</h2>
            {timeSlots.map((slot, index) => (
              <Card
                key={index}
                className={`border-0 shadow-sm cursor-pointer transition-colors ${
                  selectedTimeSlot === slot.time ? "bg-purple-50 border-purple-200" : ""
                }`}
                onClick={() => setSelectedTimeSlot(slot.time)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{slot.time}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Duration: {slot.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Available: {slot.instructor}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {slot.available}/{slot.total} spots
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6">
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleNext} disabled={!canProceed()}>
            {step === 3 ? "Complete Booking" : "Continue"}
          </Button>
        </div>
      </div>

      <BottomNavigation currentPage="calendar" />
    </div>
  )
}
