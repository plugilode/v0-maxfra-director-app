"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Users, TrendingUp, Mail, Phone } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { getStudents } from "@/lib/database"

interface Student {
  id: string
  full_name: string
  phone: string
  email: string | null
  progress_percentage: number
  status: "active" | "graduated" | "suspended"
  services: { name: string }
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents()
        setStudents(data as Student[])
      } catch (error) {
        console.error("Error loading students:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "badge-success"
      case "graduated":
        return "badge-info"
      case "suspended":
        return "badge-warning"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "from-emerald-500 to-teal-500"
    if (progress >= 70) return "from-blue-500 to-cyan-500"
    if (progress >= 50) return "from-yellow-500 to-orange-500"
    return "from-orange-500 to-red-500"
  }

  if (loading) {
    return (
      <div className="min-h-screen pb-20 fade-in">
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
                <h1 className="text-xl font-bold text-gradient">Students</h1>
                <p className="text-sm text-gray-600 font-medium">Loading...</p>
              </div>
            </div>
            <Button className="btn-primary rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="modern-card p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

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
              <h1 className="text-xl font-bold text-gradient">Students</h1>
              <p className="text-sm text-gray-600 font-medium">{students.length} total students</p>
            </div>
          </div>
          <Button className="btn-primary rounded-xl" onClick={() => (window.location.href = "/students/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 slide-up">
          <div className="stat-card text-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 w-fit mx-auto mb-3">
              <Users className="h-6 w-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{students.filter((s) => s.status === "active").length}</p>
            <p className="text-sm text-gray-600 font-medium">Active</p>
          </div>
          <div className="stat-card text-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 w-fit mx-auto mb-3">
              <TrendingUp className="h-6 w-6 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {students.filter((s) => s.status === "graduated").length}
            </p>
            <p className="text-sm text-gray-600 font-medium">Graduated</p>
          </div>
          <div className="stat-card text-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 w-fit mx-auto mb-3">
              <Users className="h-6 w-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(students.reduce((acc, s) => acc + s.progress_percentage, 0) / students.length)}%
            </p>
            <p className="text-sm text-gray-600 font-medium">Avg Progress</p>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {students.map((student, index) => (
            <div key={student.id} className="modern-card p-6 bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{student.full_name}</h3>
                  <p className="text-purple-600 font-semibold mb-2">{student.services.name}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 font-medium">{student.phone}</span>
                    </div>
                    {student.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 font-medium">{student.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={`${getStatusColor(student.status)} capitalize font-semibold`}>{student.status}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Progress: {student.progress_percentage}%</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-600">On Track</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill bg-gradient-to-r ${getProgressColor(student.progress_percentage)}`}
                    style={{ width: `${student.progress_percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {students.length === 0 && (
            <div className="modern-card p-12 text-center slide-up">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-500 font-medium">Start by adding your first student</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="btn-floating" onClick={() => (window.location.href = "/students/new")}>
        <Plus className="h-6 w-6" />
      </button>

      <BottomNavigation currentPage="students" />
    </div>
  )
}
