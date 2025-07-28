"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Template {
  id: string
  title: string
  content: string
}

export default function Documents() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("templates")
    if (stored) {
      setTemplates(JSON.parse(stored))
    } else {
      const defaults = [
        { id: "confirm", title: "Appointment Confirmation", content: "Your appointment is confirmed." },
        { id: "diploma", title: "Diploma Ready", content: "Congratulations! Your diploma is ready." },
        { id: "payment", title: "Payment Receipt", content: "Thank you for your payment." },
      ]
      setTemplates(defaults)
    }
  }, [])

  const saveTemplates = (t: Template[]) => {
    setTemplates(t)
    localStorage.setItem("templates", JSON.stringify(t))
  }

  const handleContentChange = (id: string, value: string) => {
    const updated = templates.map((t) => (t.id === id ? { ...t, content: value } : t))
    saveTemplates(updated)
  }

  const addTemplate = () => {
    if (!newTitle.trim()) return
    const newT = { id: Date.now().toString(), title: newTitle, content: "" }
    const updated = [...templates, newT]
    saveTemplates(updated)
    setNewTitle("")
  }

  const share = (content: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(content)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Documents</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {templates.map((t) => (
          <div key={t.id} className="space-y-2">
            <Label>{t.title}</Label>
            <Textarea value={t.content} onChange={(e) => handleContentChange(t.id, e.target.value)} />
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => share(t.content)}>
              Use on WhatsApp
            </Button>
          </div>
        ))}

        <div className="space-y-2 pt-4">
          <Label htmlFor="title">New Template Title</Label>
          <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={addTemplate}>
            <Plus className="h-4 w-4 mr-2" /> Add Template
          </Button>
        </div>
      </div>

      <BottomNavigation currentPage="documents" />
    </div>
  )
}
