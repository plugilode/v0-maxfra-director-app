"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, UserPlus, Upload, Share, Download, CheckCircle, Phone, Mail, MapPin, Users } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import QRCode from "qrcode"
import { jsPDF } from "jspdf"
import { addLocalStudent } from "@/lib/database"
import { designSystem } from "@/lib/design-system"

export default function AddStudent() {
  const [formData, setFormData] = useState({
    photo: "",
    fullName: "",
    address: "",
    responsible: "",
    covid: false,
    rfc: "",
    curp: "",
    phone: "",
    email: "",
    course: "",
    location: "",
    emergency: "",
    inscription: "",
    due: "",
    signature: "",
  })
  const [qr, setQr] = useState<string | null>(null)
  const [confirmationId, setConfirmationId] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const courses = [
    "Microblading Certification",
    "Eyelash Extensions",
    "Henna Specialist",
    "Advanced Microblading",
    "Volume Lashes",
    "Permanent Makeup Course",
    "Classic Lashes Course"
  ]

  const locations = [
    "Polanco",
    "Ciudad Brisas", 
    "Pedregal",
    "Online"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = Date.now().toString()
    const student = { id, ...formData, services: { name: formData.course }, progress_percentage: 0, status: "active" }
    addLocalStudent(student)
    const url = await QRCode.toDataURL(id)
    setQr(url)
    setConfirmationId(id)
    setDone(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (done && qr && confirmationId) {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(confirmationId)}`
    return (
      <div className={designSystem.layout.page}>
        {/* Success Header */}
        <div className={designSystem.components.header.gradient}>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setDone(false)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                  <CheckCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-white text-xl">Student Added Successfully!</h1>
                <p className="text-white/80 text-sm">Registration completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className={designSystem.layout.container}>
          <Card className={`${designSystem.components.card.primary} text-center`}>
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
              <p className="text-gray-600 mb-6">Student ID: #{confirmationId}</p>

              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <img src={qr} alt="QR Code" className="mx-auto w-32 h-32 mb-4" />
                <p className="text-sm text-gray-600">Scan QR code for quick access</p>
              </div>

              <div className="space-y-4">
                <Button
                  className={`${designSystem.components.button.success} w-full h-12`}
                  onClick={() => window.open(shareUrl, '_blank')}
                >
                  <Share className="h-5 w-5 mr-2" />
                  Share via WhatsApp
                </Button>
                
                <Button
                  className={`${designSystem.components.button.secondary} w-full h-12`}
                  onClick={() => {
                    const doc = new jsPDF()
                    doc.setFontSize(20)
                    doc.text('MAXFRA Beauty Academy', 20, 30)
                    doc.setFontSize(16)
                    doc.text('Student Registration', 20, 50)
                    doc.setFontSize(12)
                    doc.text(`Student: ${formData.fullName}`, 20, 80)
                    doc.text(`Course: ${formData.course}`, 20, 100)
                    doc.text(`Phone: ${formData.phone}`, 20, 120)
                    doc.text(`Email: ${formData.email}`, 20, 140)
                    doc.text(`Registration ID: ${confirmationId}`, 20, 160)
                    doc.save(`student_${confirmationId}.pdf`)
                  }}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation currentPage="students" />
      </div>
    )
  }

  return (
    <div className={designSystem.layout.page}>
      {/* Enhanced Header */}
      <div className={designSystem.components.header.gradient}>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                <UserPlus className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">Add New Student</h1>
              <p className="text-white/80 text-sm">Complete student registration</p>
            </div>
          </div>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-900">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter student's full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">Phone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="+52 55 1234 5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-900">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-900">Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="Street, number, city"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsible" className="text-sm font-semibold text-gray-900">Responsible Person</Label>
                  <Input
                    id="responsible"
                    placeholder="Parent or guardian name"
                    value={formData.responsible}
                    onChange={(e) => handleInputChange('responsible', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information Section */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Academic Information</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-sm font-semibold text-gray-900">Course *</Label>
                  <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold text-gray-900">Preferred Location</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Information Section */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Legal Information</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rfc" className="text-sm font-semibold text-gray-900">RFC</Label>
                    <Input 
                      id="rfc" 
                      placeholder="ABCD123456EFG" 
                      value={formData.rfc} 
                      onChange={(e) => handleInputChange('rfc', e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="curp" className="text-sm font-semibold text-gray-900">CURP</Label>
                    <Input 
                      id="curp" 
                      placeholder="ABCD123456HEFGHI01" 
                      value={formData.curp} 
                      onChange={(e) => handleInputChange('curp', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <input
                    id="covid"
                    type="checkbox"
                    checked={formData.covid}
                    onChange={(e) => handleInputChange('covid', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="covid" className="text-sm font-medium text-gray-900">
                    COVID-19 Vaccination Certificate
                  </Label>
                  {formData.covid && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency & Payment Information */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Emergency & Payment</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency" className="text-sm font-semibold text-gray-900">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    placeholder="Emergency contact phone"
                    value={formData.emergency}
                    onChange={(e) => handleInputChange('emergency', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inscription" className="text-sm font-semibold text-gray-900">Inscription Payment</Label>
                    <Input
                      id="inscription"
                      type="number"
                      placeholder="0"
                      value={formData.inscription}
                      onChange={(e) => handleInputChange('inscription', e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="due" className="text-sm font-semibold text-gray-900">Payment Due</Label>
                    <Input
                      id="due"
                      type="number"
                      placeholder="0"
                      value={formData.due}
                      onChange={(e) => handleInputChange('due', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signature" className="text-sm font-semibold text-gray-900">Authorized Signature</Label>
                  <Input
                    id="signature"
                    placeholder="Name of person authorized to sign"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload Section */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Student Photo</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="photo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-purple-600" />
                      <p className="mb-2 text-sm text-purple-600 font-medium">
                        <span className="font-semibold">Click to upload</span> student photo
                      </p>
                      <p className="text-xs text-purple-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                    </div>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          handleInputChange('photo', reader.result as string)
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                  </label>
                </div>
                
                {formData.photo && (
                  <div className="flex justify-center">
                    <img 
                      src={formData.photo} 
                      alt="Student preview" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit" 
              className={`w-full ${designSystem.components.button.gradient} h-14 text-lg font-semibold`}
              disabled={!formData.fullName || !formData.phone || !formData.address || !formData.course}
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Register Student
            </Button>
          </div>
        </form>
      </div>

      <BottomNavigation currentPage="students" />
    </div>
  )
}
