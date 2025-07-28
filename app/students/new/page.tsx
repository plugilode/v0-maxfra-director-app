"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import QRCode from "qrcode"
import { jsPDF } from "jspdf"
import { addLocalStudent } from "@/lib/database"

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

  if (done && qr && confirmationId) {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(confirmationId)}`
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => setDone(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Student Added</h1>
        </div>
        <div className="p-4 space-y-4 text-center">
          <img src={qr} alt="QR" className="mx-auto w-32 h-32" />
          <p className="text-sm text-gray-600">Confirmation #{confirmationId}</p>
          <a href={shareUrl} className="block bg-green-600 text-white py-2 rounded-md">Share via WhatsApp</a>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
            onClick={() => {
              const doc = new jsPDF()
              doc.text(`Student: ${formData.fullName}`, 10, 10)
              doc.text(`Course: ${formData.course}`, 10, 20)
              doc.text(`Phone: ${formData.phone}`, 10, 30)
              doc.save(`student_${confirmationId}.pdf`)
            }}
          >
            Download PDF
          </Button>
        </div>
        <BottomNavigation currentPage="students" />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Add New Student</h1>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter student name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              placeholder="+52 55 1234 5678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              placeholder="Street and number"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsible">Responsible Person</Label>
            <Input
              id="responsible"
              placeholder="Parent or guardian"
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="covid"
              type="checkbox"
              checked={formData.covid}
              onChange={(e) => setFormData({ ...formData, covid: e.target.checked })}
            />
            <Label htmlFor="covid">COVID Vaccine</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rfc">RFC</Label>
            <Input id="rfc" value={formData.rfc} onChange={(e) => setFormData({ ...formData, rfc: e.target.value })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="curp">CURP</Label>
            <Input id="curp" value={formData.curp} onChange={(e) => setFormData({ ...formData, curp: e.target.value })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course *</Label>
            <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency">Emergency Contact</Label>
            <Input
              id="emergency"
              value={formData.emergency}
              onChange={(e) => setFormData({ ...formData, emergency: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inscription">Inscription Payment</Label>
            <Input
              id="inscription"
              type="number"
              value={formData.inscription}
              onChange={(e) => setFormData({ ...formData, inscription: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="due">Payment Due</Label>
            <Input
              id="due"
              type="number"
              value={formData.due}
              onChange={(e) => setFormData({ ...formData, due: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature">Signature Name</Label>
            <Input
              id="signature"
              value={formData.signature}
              onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onloadend = () => {
                  setFormData({ ...formData, photo: reader.result as string })
                }
                reader.readAsDataURL(file)
              }}
            />
          </div>

          <div className="pt-6">
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Add Student
            </Button>
          </div>
        </form>
      </div>

      <BottomNavigation currentPage="students" />
    </div>
  )
}
