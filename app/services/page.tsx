"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Services() {
  const courses = [
    {
      id: 1,
      name: "Advanced Microblading",
      duration: "3 hours",
      price: 3500,
      category: "course",
      description: "Professional microblading certification course",
    },
    {
      id: 2,
      name: "Volume Lashes Course",
      duration: "3 hours",
      price: 2800,
      category: "course",
      description: "Learn advanced volume lash techniques",
    },
  ]

  const services = [
    {
      id: 3,
      name: "Microblading Touch-up",
      duration: "1 hour",
      price: 800,
      category: "service",
      description: "Refresh and perfect your microblading",
    },
    {
      id: 4,
      name: "Eyelash Application",
      duration: "1.5 hours",
      price: 600,
      category: "service",
      description: "Professional eyelash extension application",
    },
    {
      id: 5,
      name: "Eyebrow Shaping",
      duration: "30 minutes",
      price: 300,
      category: "service",
      description: "Perfect eyebrow shaping and styling",
    },
    {
      id: 6,
      name: "Consultation",
      duration: "30 minutes",
      price: 200,
      category: "service",
      description: "Professional beauty consultation",
    },
  ]

  const informational = [
    {
      id: 7,
      name: "Career Information Session",
      duration: "1 hour",
      price: "FREE",
      category: "info",
      description: "Learn about career opportunities in beauty",
    },
    {
      id: 8,
      name: "Course Overview",
      duration: "45 minutes",
      price: "FREE",
      category: "info",
      description: "Overview of all available courses",
    },
    {
      id: 9,
      name: "Academy Tour",
      duration: "30 minutes",
      price: "FREE",
      category: "info",
      description: "Tour our state-of-the-art facilities",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "course":
        return <Star className="h-4 w-4 text-purple-600" />
      case "service":
        return <Star className="h-4 w-4 text-orange-600" />
      case "info":
        return <Star className="h-4 w-4 text-blue-600" />
      default:
        return <Star className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "course":
        return "text-purple-600"
      case "service":
        return "text-orange-600"
      case "info":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const formatPrice = (price: number | string) => {
    if (price === "FREE") return price
    return `$${price}`
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Services & Courses</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Courses Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Courses</h2>
          </div>
          <div className="space-y-3">
            {courses.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Duration: {item.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${getCategoryColor(item.category)}`}>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">Services</h2>
          </div>
          <div className="space-y-3">
            {services.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Duration: {item.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${getCategoryColor(item.category)}`}>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informational Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations</h2>
          </div>
          <div className="space-y-3">
            {informational.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Duration: {item.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">{formatPrice(item.price)}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation currentPage="services" />
    </div>
  )
}
