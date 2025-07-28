"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function NewReceipt() {
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    method: "",
  })
  const [confirmation, setConfirmation] = useState<string | null>(null)

  const preview = `Receipt\n${formData.student}\nAmount: ${formData.amount}\nMethod: ${formData.method}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 100000).toString()
    setConfirmation(id)
  }

  const shareUrl = confirmation
    ? `https://wa.me/?text=${encodeURIComponent(
        `Receipt #${confirmation}\n${formData.student}\nAmount: ${formData.amount}\nMethod: ${formData.method}`,
      )}`
    : "#"

  if (confirmation) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setConfirmation(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-gray-900">Receipt Created</h1>
          </div>
        </div>
        <div className="p-4 space-y-4 text-center">
          <p className="text-sm text-gray-600">Receipt #{confirmation}</p>
          <p className="text-sm text-gray-600">{formData.student}</p>
          <p className="text-sm text-gray-600">Amount: {formData.amount}</p>
          <p className="text-sm text-gray-600">Method: {formData.method}</p>
          <a href={shareUrl} className="block bg-green-600 text-white py-2 rounded-md">
            Share via WhatsApp
          </a>
        </div>
        <BottomNavigation currentPage="documents" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Create Receipt</h1>
        </div>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="student">Student *</Label>
            <Input
              id="student"
              placeholder="Enter student name"
              value={formData.student}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="method">Payment Method *</Label>
            <Input
              id="method"
              placeholder="Cash / Card"
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              required
            />
          </div>
          {formData.student && formData.amount && formData.method && (
            <div className="bg-gray-100 rounded p-3 text-sm text-gray-700 whitespace-pre-line">
              {preview}
            </div>
          )}
          <div className="pt-6">
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Create Receipt
            </Button>
          </div>
        </form>
      </div>
      <BottomNavigation currentPage="documents" />
    </div>
  )
}
