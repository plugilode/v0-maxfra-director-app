"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Plus, Search, Users as UsersIcon, TrendingUp, BookOpen } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  getStudents,
  getLocalStudents,
  removeLocalStudent,
} from "@/lib/database"
import { designSystem, getStatusBadgeStyle } from "@/lib/design-system"

interface Student {
  id: string
  full_name: string
  phone: string
  email: string | null
  progress_percentage: number
  status: "active" | "graduated" | "suspended"
  services: { name: string }
  // optional fields for locally added students
  fullName?: string
  address?: string
  responsible?: string
  covid?: boolean
  rfc?: string
  curp?: string
  course?: string
  location?: string
  emergency?: string
  inscription?: string
  due?: string
  signature?: string
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await getStudents()
        const local = getLocalStudents()
        setStudents([...(data as Student[]), ...local])
      } catch (error) {
        console.error("Error loading students:", error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredStudents = students.filter(student => {
    const name = student.fullName || student.full_name || ""
    const course = student.course || student.services?.name || ""
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           course.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === "active").length,
    graduated: students.filter(s => s.status === "graduated").length,
    avgProgress: students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.progress_percentage, 0) / students.length)
      : 0
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const handleDelete = (id: string) => {
    removeLocalStudent(id)
    setStudents(students.filter(s => s.id !== id))
    setSelected(null)
  }

  if (selected) {
    return (
      <div className={designSystem.layout.page}>
        {/* Student Detail Header */}
        <div className={designSystem.components.header.gradient}>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setSelected(null)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                  {(selected.fullName || selected.full_name).charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-white text-xl">{selected.fullName || selected.full_name}</h1>
                <p className="text-white/80 text-sm">{selected.course || selected.services.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={designSystem.layout.container}>
          {/* Progress Card */}
          <Card className={designSystem.components.card.primary}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Course Progress</h3>
                <Badge className={getStatusBadgeStyle(selected.status)}>
                  {selected.status}
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{selected.progress_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(selected.progress_percentage)}`}
                      style={{ width: `${selected.progress_percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{selected.phone}</p>
                </div>
                {selected.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{selected.email}</p>
                  </div>
                )}
                {selected.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-900">{selected.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className={designSystem.components.button.primary}
              onClick={() => (window.location.href = `/students/${selected.id}/edit`)}
            >
              Edit Student
            </Button>
            <Button 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => handleDelete(selected.id)}
            >
              Delete Student
            </Button>
          </div>
        </div>

        <BottomNavigation currentPage="students" />
      </div>
    )
  }

  return (
    <div className={designSystem.layout.page}>
      {/* Enhanced Header */}
      <div className={designSystem.components.header.gradient}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                <UsersIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">Students</h1>
              <p className="text-white/80 text-sm">{stats.total} total students</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => (window.location.href = "/students/new")}
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
              <UsersIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-blue-600 font-medium">Total</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-green-50 border border-green-200`}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-green-600 font-medium">Active</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-purple-50 border border-purple-200`}>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
              <p className="text-sm text-purple-600 font-medium">Avg Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students or courses..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Students List */}
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
        ) : filteredStudents.length > 0 ? (
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className={`${designSystem.components.card.elevated} hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-[1.02]`}
                onClick={() => setSelected(student)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-12 w-12 bg-gradient-to-r from-purple-400 to-blue-400">
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                          {(student.fullName || student.full_name).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {student.fullName || student.full_name}
                        </h3>
                        <p className="text-purple-600 font-medium text-sm">
                          {student.course || student.services.name}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getStatusBadgeStyle(student.status)}>
                            {student.status}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(student.progress_percentage)}`}
                                style={{ width: `${student.progress_percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {student.progress_percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className={designSystem.components.card.primary}>
            <CardContent className="p-8 text-center">
              <UsersIcon className={`${designSystem.icons.sizes.xxl} text-purple-400 mx-auto mb-4`} />
              <p className="text-gray-600 text-lg font-medium">
                {searchQuery ? "No students found" : "No students enrolled yet"}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {searchQuery ? "Try adjusting your search" : "Add your first student to get started!"}
              </p>
              {!searchQuery && (
                <Button 
                  className={`${designSystem.components.button.gradient} mt-4`}
                  onClick={() => (window.location.href = "/students/new")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation currentPage="students" />
    </div>
  )
}
