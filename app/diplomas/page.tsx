"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, GraduationCap, Award, TrendingUp, Share, Download, CheckCircle, Users } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useState } from "react"
import { designSystem, getStatusBadgeStyle } from "@/lib/design-system"

export default function Diplomas() {
  const [generated, setGenerated] = useState<string | null>(null)
  
  const eligibleStudents = [
    {
      id: 1,
      name: "Maria Garcia Lopez",
      program: "Advanced Microblading",
      status: "Course Completed",
      progress: 100,
      completionDate: "2024-01-15",
      grade: "A+",
    },
    {
      id: 2,
      name: "Ana Sofia Mendez",
      program: "Volume Lashes Course", 
      status: "Course Completed",
      progress: 100,
      completionDate: "2024-01-10",
      grade: "A",
    },
  ]

  const studentsInProgress = [
    {
      id: 3,
      name: "Emma Rodriguez Sanchez",
      program: "Microblading Certification",
      progress: 85,
      status: "In Progress",
      expectedCompletion: "2024-02-20",
    },
    {
      id: 4,
      name: "Sophia Kim Lee",
      program: "Eyelash Extensions",
      progress: 92,
      status: "Almost Done",
      expectedCompletion: "2024-02-15",
    },
    {
      id: 5,
      name: "Isabella Chen Wang",
      program: "Henna Specialist",
      progress: 78,
      status: "In Progress",
      expectedCompletion: "2024-03-01",
    },
  ]

  const stats = {
    total: eligibleStudents.length + studentsInProgress.length,
    eligible: eligibleStudents.length,
    inProgress: studentsInProgress.length,
    generated: 15, // Total diplomas generated this month
  }

  const handleGenerateDiploma = (studentName: string) => {
    setGenerated(studentName)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const shareUrl = generated
    ? `https://wa.me/?text=${encodeURIComponent(
        `🎓 Congratulations ${generated}! Your diploma from MAXFRA Beauty Academy is ready for pickup. Well done on completing your course!`,
      )}`
    : "#"

  if (generated) {
    return (
      <div className={designSystem.layout.page}>
        {/* Success Header */}
        <div className={designSystem.components.header.gradient}>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setGenerated(null)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                  <CheckCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-white text-xl">Diploma Generated!</h1>
                <p className="text-white/80 text-sm">Certificate ready for {generated}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={designSystem.layout.container}>
          <Card className={`${designSystem.components.card.primary} text-center`}>
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🎓 Diploma Ready!</h2>
              <p className="text-gray-600 mb-6">Certificate has been generated for {generated}</p>

              {/* Diploma Preview */}
              <Card className={designSystem.components.card.base}>
                <CardContent className="p-8">
                  <div className="border-4 border-double border-purple-300 p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="text-center space-y-4">
                      <div className="text-purple-600">
                        <GraduationCap className="h-16 w-16 mx-auto mb-4" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">MAXFRA Beauty Academy</h1>
                      <h2 className="text-lg font-semibold text-purple-600">Certificate of Completion</h2>
                      
                      <div className="py-6">
                        <p className="text-sm text-gray-600 mb-2">This certifies that</p>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{generated}</h3>
                        <p className="text-sm text-gray-600 mb-2">has successfully completed the</p>
                        <h4 className="text-lg font-semibold text-purple-600 mb-4">
                          {eligibleStudents.find(s => s.name === generated)?.program}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Completed on {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end pt-6 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          <p>Director</p>
                          <div className="w-20 border-b border-gray-300 mt-2"></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          <p>Date</p>
                          <div className="w-20 border-b border-gray-300 mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4 mt-6">
                <Button
                  className={`${designSystem.components.button.success} w-full h-12`}
                  onClick={() => window.open(shareUrl, '_blank')}
                >
                  <Share className="h-5 w-5 mr-2" />
                  Share via WhatsApp
                </Button>
                
                <Button
                  className={`${designSystem.components.button.secondary} w-full h-12`}
                  onClick={() => window.print()}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation currentPage="documents" />
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
                <GraduationCap className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">Generate Diplomas</h1>
              <p className="text-white/80 text-sm">{stats.eligible} students ready</p>
            </div>
          </div>
          <div className="text-white/80 text-right">
            <p className="text-sm">This Month</p>
            <p className="text-xl font-bold">{stats.generated}</p>
          </div>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-3">
          <Card className={`${designSystem.components.card.base} bg-blue-50 border border-blue-200`}>
            <CardContent className="p-3 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-blue-600 font-medium">Total</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-green-50 border border-green-200`}>
            <CardContent className="p-3 text-center">
              <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.eligible}</p>
              <p className="text-xs text-green-600 font-medium">Ready</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-orange-50 border border-orange-200`}>
            <CardContent className="p-3 text-center">
              <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.inProgress}</p>
              <p className="text-xs text-orange-600 font-medium">In Progress</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-purple-50 border border-purple-200`}>
            <CardContent className="p-3 text-center">
              <GraduationCap className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.generated}</p>
              <p className="text-xs text-purple-600 font-medium">Generated</p>
            </CardContent>
          </Card>
        </div>

        {/* Eligible Students */}
        <div className={designSystem.layout.section}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Eligible Students</h2>
            <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-green-200 via-green-300 to-transparent rounded"></div>
            <Badge className="bg-green-100 text-green-800">
              {eligibleStudents.length} ready
            </Badge>
          </div>
          
          {eligibleStudents.length > 0 ? (
            <div className="space-y-3">
              {eligibleStudents.map((student) => (
                <Card key={student.id} className={`${designSystem.components.card.elevated} hover:shadow-xl transition-all duration-200`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="h-12 w-12 bg-gradient-to-r from-green-400 to-green-500">
                          <AvatarFallback className="bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                          <p className="text-purple-600 font-medium">{student.program}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              ✓ {student.status}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              Grade: <span className="font-semibold text-green-600">{student.grade}</span>
                            </span>
                            <span className="text-sm text-gray-500">
                              Completed: {student.completionDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className={`${designSystem.components.button.gradient} h-10`}
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
            <Card className={designSystem.components.card.primary}>
              <CardContent className="p-8 text-center">
                <GraduationCap className={`${designSystem.icons.sizes.xxl} text-green-400 mx-auto mb-4`} />
                <p className="text-gray-600 text-lg font-medium">No students ready for diploma generation</p>
                <p className="text-gray-500 text-sm mt-2">Students will appear here when they complete their courses</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Students in Progress */}
        <div className={designSystem.layout.section}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Students in Progress</h2>
            <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-orange-200 via-orange-300 to-transparent rounded"></div>
            <Badge className="bg-orange-100 text-orange-800">
              {studentsInProgress.length} in progress
            </Badge>
          </div>
          
          <div className="space-y-3">
            {studentsInProgress.map((student) => (
              <Card key={student.id} className={`${designSystem.components.card.elevated} hover:shadow-xl transition-all duration-200`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-12 w-12 bg-gradient-to-r from-orange-400 to-orange-500">
                        <AvatarFallback className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                        <p className="text-purple-600 font-medium">{student.program}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {student.progress}%
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            Expected: {student.expectedCompletion}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusBadgeStyle(student.status.toLowerCase().replace(' ', '_'))}>
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
