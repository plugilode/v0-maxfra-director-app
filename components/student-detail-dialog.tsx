"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  GraduationCap,
  TrendingUp,
  QrCode,
  Camera,
  CreditCard,
  CheckCircle,
  XCircle,
  User,
  BookOpen,
  Award,
} from "lucide-react"

interface StudentDetailDialogProps {
  student: {
    id: string
    full_name: string
    phone: string
    email: string | null
    progress_percentage: number
    status: "active" | "graduated" | "suspended"
    services: { name: string }
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for additional student details
const getStudentDetails = (studentId: string) => ({
  photo: "/placeholder-user.jpg",
  qrCode: `STUDENT-${studentId}-QR`,
  enrollmentDate: "2024-01-15",
  graduationDate: null,
  totalPaid: 185000,
  remainingBalance: 0,
  nextPayment: null,
  checkIns: [
    { date: "2024-07-28", time: "09:30", location: "Polanco" },
    { date: "2024-07-25", time: "14:15", location: "Polanco" },
    { date: "2024-07-22", time: "10:00", location: "Polanco" },
  ],
  checkOuts: [
    { date: "2024-07-28", time: "16:30", location: "Polanco" },
    { date: "2024-07-25", time: "17:45", location: "Polanco" },
    { date: "2024-07-22", time: "15:00", location: "Polanco" },
  ],
  attendance: 85,
  completedModules: 8,
  totalModules: 12,
  certificates: ["Basic Certification", "Advanced Techniques"],
  notes: "Excellent student with great attention to detail. Shows strong potential in advanced techniques.",
})

export function StudentDetailDialog({ student, open, onOpenChange }: StudentDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")
  
  if (!student) return null

  const details = getStudentDetails(student.id)
  const initials = student.full_name.split(" ").map(n => n[0]).join("").toUpperCase()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "graduated":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "from-emerald-500 to-teal-500"
    if (progress >= 70) return "from-blue-500 to-cyan-500"
    if (progress >= 50) return "from-yellow-500 to-orange-500"
    return "from-orange-500 to-red-500"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Student Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Header */}
          <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={details.photo} alt={student.full_name} />
              <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{student.full_name}</h2>
              <p className="text-purple-600 font-semibold mb-2">{student.services.name}</p>
              <Badge className={`${getStatusColor(student.status)} capitalize font-semibold`}>
                {student.status}
              </Badge>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{student.phone}</span>
                </div>
                {student.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{student.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <QrCode className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">QR Code</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="finances">Finances</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Enrollment Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="font-semibold">{details.enrollmentDate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Attendance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">{details.attendance}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Modules Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold">{details.completedModules}/{details.totalModules}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">${details.totalPaid.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Certificates & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {details.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{details.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress: {student.progress_percentage}%</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600">On Track</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(student.progress_percentage)}`}
                        style={{ width: `${student.progress_percentage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Module Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: details.totalModules }, (_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm">Module {i + 1}</span>
                        <div className="flex items-center space-x-2">
                          {i < details.completedModules ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-300" />
                          )}
                          <span className="text-sm text-gray-600">
                            {i < details.completedModules ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finances" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ${details.totalPaid.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Remaining Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      ${details.remainingBalance.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">Initial Payment</p>
                          <p className="text-sm text-green-600">January 15, 2024</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-800">$92,500</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">Second Payment</p>
                          <p className="text-sm text-green-600">March 15, 2024</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-800">$92,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Check-ins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {details.checkIns.map((checkIn, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{checkIn.date}</span>
                          </div>
                          <span className="text-gray-600">{checkIn.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Check-outs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {details.checkOuts.map((checkOut, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>{checkOut.date}</span>
                          </div>
                          <span className="text-gray-600">{checkOut.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Sessions</span>
                      <span className="font-semibold">{details.checkIns.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className="font-semibold text-green-600">{details.attendance}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Session</span>
                      <span className="font-semibold">{details.checkIns[0]?.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
            <Button variant="outline" className="flex-1">
              <QrCode className="h-4 w-4 mr-2" />
              Scan QR
            </Button>
            <Button className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 