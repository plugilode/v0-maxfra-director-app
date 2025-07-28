"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus } from "lucide-react"
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

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents()
        const local = getLocalStudents() as Student[]
        setStudents([...(data as Student[]), ...local])
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
        return "bg-green-100 text-green-800"
      case "graduated":
        return "bg-blue-100 text-blue-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-orange-500"
  }

  const handleRemove = (id: string) => {
    removeLocalStudent(id)
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="font-semibold text-gray-900">Students</h1>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-4">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-gray-900">Students</h1>
          </div>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => (window.location.href = "/students/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {students.map((student) => (
          <Card key={student.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => setSelected(student)}
                    className="font-semibold text-gray-900 hover:underline text-left"
                  >
                    {student.full_name ?? (student as any).fullName}
                  </button>
                  <p className="text-sm text-gray-600">{student.services.name}</p>
                  <p className="text-sm text-gray-500">{student.phone}</p>
                  {student.email && <p className="text-sm text-gray-500">{student.email}</p>}
                </div>
                <Badge className={`${getStatusColor(student.status)} text-xs capitalize`}>{student.status}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress: {student.progress_percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student.progress_percentage)}`}
                    style={{ width: `${student.progress_percentage}%` }}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      (window.location.href = `/students/${student.id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(student.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {students.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No students found</p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation currentPage="students" />

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selected.full_name ?? (selected as any).fullName}
                </DialogTitle>
                <DialogDescription>
                  <div className="space-y-1 pt-2 text-left">
                    <p>
                      <strong>Course:</strong>{" "}
                      {selected.services?.name ?? (selected as any).course}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selected.phone}
                    </p>
                    {selected.email && (
                      <p>
                        <strong>Email:</strong> {selected.email}
                      </p>
                    )}
                    {"address" in selected && selected.address && (
                      <p>
                        <strong>Address:</strong> {selected.address as string}
                      </p>
                    )}
                    {"location" in selected && selected.location && (
                      <p>
                        <strong>Location:</strong> {selected.location as string}
                      </p>
                    )}
                    {"responsible" in selected && selected.responsible && (
                      <p>
                        <strong>Responsible:</strong>{" "}
                        {selected.responsible as string}
                      </p>
                    )}
                    {"emergency" in selected && selected.emergency && (
                      <p>
                        <strong>Emergency:</strong> {selected.emergency as string}
                      </p>
                    )}
                    {"inscription" in selected && selected.inscription && (
                      <p>
                        <strong>Inscription Paid:</strong> {selected.inscription as string}
                      </p>
                    )}
                    {"due" in selected && selected.due && (
                      <p>
                        <strong>Payment Due:</strong> {selected.due as string}
                      </p>
                    )}
                    {"signature" in selected && selected.signature && (
                      <p>
                        <strong>Signature:</strong> {selected.signature as string}
                      </p>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
