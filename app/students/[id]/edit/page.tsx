"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { getLocalStudents, updateLocalStudent } from "@/lib/database"

export default function EditStudent() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params.id as string
  const [formData, setFormData] = useState<any | null>(null)

  useEffect(() => {
    const students = getLocalStudents()
    const s = students.find((st: any) => st.id === id)
    if (s) setFormData(s)
  }, [id])

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        Loading...
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateLocalStudent(id, formData)
    window.location.href = "/students"
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Edit Student</h1>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.fullName} onChange={e=>setFormData({...formData, fullName:e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
          </div>
          <div className="pt-4">
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Save</Button>
          </div>
        </form>
      </div>

      <BottomNavigation currentPage="students" />
    </div>
  )
}
