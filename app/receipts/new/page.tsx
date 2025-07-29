"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Receipt, DollarSign, User, CreditCard, Share, CheckCircle, FileText } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { designSystem } from "@/lib/design-system"

export default function NewReceipt() {
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    method: "",
    concept: "",
    notes: "",
  })
  const [confirmation, setConfirmation] = useState<string | null>(null)

  const paymentMethods = [
    { id: "cash", name: "Cash", icon: "💵" },
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "transfer", name: "Bank Transfer", icon: "🏦" },
    { id: "paypal", name: "PayPal", icon: "💻" },
  ]

  const concepts = [
    "Course Payment",
    "Registration Fee", 
    "Materials Fee",
    "Exam Fee",
    "Certificate Fee",
    "Late Payment Fee",
    "Other"
  ]

  const formatCurrency = (amount: string) => {
    if (!amount) return ""
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(Number(amount))
  }

  const preview = `MAXFRA Beauty Academy
Receipt #${confirmation || "XXXX"}

Student: ${formData.student || "Student Name"}
Concept: ${formData.concept || "Payment Concept"}
Amount: ${formatCurrency(formData.amount) || "$0.00"}
Payment Method: ${formData.method || "Payment Method"}
${formData.notes ? `Notes: ${formData.notes}` : ""}

Thank you for your payment!`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    setConfirmation(id)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const shareUrl = confirmation
    ? `https://wa.me/?text=${encodeURIComponent(preview)}`
    : "#"

  if (confirmation) {
    return (
      <div className={designSystem.layout.page}>
        {/* Success Header */}
        <div className={designSystem.components.header.gradient}>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setConfirmation(null)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                  <CheckCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-white text-xl">Receipt Created Successfully!</h1>
                <p className="text-white/80 text-sm">Receipt #{confirmation}</p>
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
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Receipt Generated!</h2>
              <p className="text-gray-600 mb-6">Receipt #{confirmation} has been created successfully</p>

              {/* Receipt Preview */}
              <Card className={designSystem.components.card.base}>
                <CardContent className="p-6">
                  <div className="text-left space-y-3">
                    <div className="border-b border-gray-200 pb-3">
                      <h3 className="font-bold text-gray-900 text-lg">MAXFRA Beauty Academy</h3>
                      <p className="text-sm text-gray-600">Official Receipt</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Receipt #:</span>
                        <span className="font-semibold text-gray-900">{confirmation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student:</span>
                        <span className="font-semibold text-gray-900">{formData.student}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Concept:</span>
                        <span className="font-semibold text-gray-900">{formData.concept}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-bold text-green-600 text-lg">{formatCurrency(formData.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-semibold text-gray-900">{formData.method}</span>
                      </div>
                      {formData.notes && (
                        <div className="pt-2 border-t border-gray-100">
                          <span className="text-gray-600">Notes:</span>
                          <p className="text-sm text-gray-900 mt-1">{formData.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 text-center">
                      <p className="text-sm text-gray-500">Thank you for your payment!</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleString()}</p>
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
                  <FileText className="h-5 w-5 mr-2" />
                  Print Receipt
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
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                <Receipt className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">Create Receipt</h1>
              <p className="text-white/80 text-sm">Generate payment receipt</p>
            </div>
          </div>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student" className="text-sm font-semibold text-gray-900">Student Name *</Label>
                <Input
                  id="student"
                  placeholder="Enter student name"
                  value={formData.student}
                  onChange={(e) => handleInputChange('student', e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="concept" className="text-sm font-semibold text-gray-900">Payment Concept *</Label>
                  <Select value={formData.concept} onValueChange={(value) => handleInputChange('concept', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select payment concept" />
                    </SelectTrigger>
                    <SelectContent>
                      {concepts.map((concept) => (
                        <SelectItem key={concept} value={concept}>
                          {concept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-semibold text-gray-900">Amount *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="pl-10 h-12 text-lg font-semibold"
                      required
                    />
                  </div>
                  {formData.amount && (
                    <p className="text-sm text-green-600 font-medium">
                      Amount: {formatCurrency(formData.amount)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className={`${designSystem.components.card.elevated} cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                      formData.method === method.name ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50' : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleInputChange('method', method.name)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <h3 className="font-semibold text-gray-900 text-sm">{method.name}</h3>
                      {formData.method === method.name && (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Additional Notes</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-semibold text-gray-900">Notes (Optional)</Label>
                <textarea
                  id="notes"
                  placeholder="Add any additional notes or comments..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Receipt Preview */}
          {formData.student && formData.amount && formData.method && formData.concept && (
            <Card className={designSystem.components.card.primary}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Receipt Preview</h3>
                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {preview}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit" 
              className={`w-full ${designSystem.components.button.gradient} h-14 text-lg font-semibold`}
              disabled={!formData.student || !formData.amount || !formData.method || !formData.concept}
            >
              <Receipt className="h-5 w-5 mr-2" />
              Generate Receipt
            </Button>
          </div>
        </form>
      </div>
      <BottomNavigation currentPage="documents" />
    </div>
  )
}
