"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, GraduationCap } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Diplomas() {
  const eligibleStudents = [
    {
      id: 1,
      name: "Maria Garcia",
      program: "Advanced Microblading",
      status: "Course Completed",
      progress: 100,
    },
  ]

  const studentsInProgress = [
    {
      id: 2,
      name: "Emma Rodriguez",
      program: "Microblading Certification",
      progress: 85,
      status: "Not Ready",
    },
    {
      id: 3,
      name: "Sophia Kim",
      program: "Eyelash Extensions",
      progress: 92,
      status: "Not Ready",
    },
    {
      id: 4,
      name: "Isabella Chen",
      program: "Henna Specialist",
      progress: 78,
      status: "Not Ready",
    },
  ]

  const handleGenerateDiploma = (studentName: string) => {
    const text = `Congratulations ${studentName}! Your diploma is ready.`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Generate Diploma</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Eligible Students */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Eligible Students</h2>
          {eligibleStudents.length > 0 ? (
            <div className="space-y-3">
              {eligibleStudents.map((student) => (
                <Card key={student.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.program}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-green-100 text-green-800 text-xs">✓ {student.status}</Badge>
                        </div>
                      </div>
                      <Button
                        className="bg-pink-600 hover:bg-pink-700"
                        onClick={() => handleGenerateDiploma(student.name)}
                      >
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No students ready for diploma generation</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Students in Progress */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Students in Progress</h2>
          <div className="space-y-3">
            {studentsInProgress.map((student) => (
              <Card key={student.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.program}</p>
                      <p className="text-sm text-gray-500 mt-1">Progress: {student.progress}%</p>
                    </div>
                    <Badge variant="secondary" className="text-gray-600">
                      {student.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation currentPage="documents" />
    </div>
  )
}
