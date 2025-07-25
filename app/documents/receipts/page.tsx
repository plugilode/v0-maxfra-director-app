"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Receipt, Share2, Eye, Plus, FileText, Printer } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ReceiptMaker() {
  const [receiptData, setReceiptData] = useState({
    receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
    studentName: "",
    studentPhone: "",
    serviceName: "",
    amount: "",
    paymentMethod: "cash",
    paymentStatus: "paid",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [previewMode, setPreviewMode] = useState(false)

  const services = [
    { name: "Microblading Certification", price: 3500 },
    { name: "Volume Lashes Course", price: 2800 },
    { name: "Advanced Microblading", price: 4200 },
    { name: "Classic Lashes Course", price: 2200 },
    { name: "Henna Specialist Certification", price: 1800 },
    { name: "Permanent Makeup Course", price: 5500 },
    { name: "Ombre Brows Technique", price: 3200 },
    { name: "Microblading Touch-up", price: 800 },
    { name: "Eyelash Application", price: 600 },
    { name: "Eyebrow Shaping", price: 300 },
  ]

  const recentReceipts = [
    {
      id: "REC-001",
      student: "Emma Rodriguez",
      service: "Microblading Certification",
      amount: 3500,
      date: "2025-01-24",
      status: "paid",
    },
    {
      id: "REC-002",
      student: "Sophia Kim",
      service: "Volume Lashes Course",
      amount: 2800,
      date: "2025-01-23",
      status: "pending",
    },
  ]

  const handleServiceSelect = (serviceName: string) => {
    const service = services.find((s) => s.name === serviceName)
    setReceiptData({
      ...receiptData,
      serviceName,
      amount: service ? service.price.toString() : "",
    })
  }

  const handleGenerate = () => {
    console.log("Generating receipt:", receiptData)
    // Here you would generate the actual receipt
  }

  const handleShare = () => {
    const message = `*MAXFRA Academy - Receipt*\n\nReceipt: ${receiptData.receiptNumber}\nStudent: ${receiptData.studentName}\nService: ${receiptData.serviceName}\nAmount: $${receiptData.amount} MXN\nDate: ${receiptData.date}\n\nThank you for choosing MAXFRA Academy!`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        {/* Receipt Preview */}
        <div className="max-w-md mx-auto bg-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-purple-600 mb-2">MAXFRA ACADEMY</h1>
            <p className="text-gray-600">Beauty Training Academy</p>
            <p className="text-sm text-gray-500">Ciudad de México, CDMX</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h2 className="text-lg font-bold text-center mb-4">RECEIPT</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Receipt #:</span>
                <span className="font-semibold">{receiptData.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{receiptData.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Student:</span>
                <span>{receiptData.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>{receiptData.studentPhone}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-semibold">Service</span>
              <span className="font-semibold">Amount</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span>{receiptData.serviceName}</span>
              <span>${receiptData.amount} MXN</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${receiptData.amount} MXN</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span>Payment Method:</span>
              <span className="capitalize">{receiptData.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Status:</span>
              <Badge className={receiptData.paymentStatus === "paid" ? "badge-success" : "badge-warning"}>
                {receiptData.paymentStatus}
              </Badge>
            </div>
          </div>

          {receiptData.notes && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                <strong>Notes:</strong> {receiptData.notes}
              </p>
            </div>
          )}

          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Thank you for choosing MAXFRA Academy!</p>
            <p>For questions, contact us at info@maxfra.mx</p>
          </div>
        </div>

        {/* Preview Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex space-x-3 max-w-md mx-auto">
            <Button variant="outline" onClick={() => setPreviewMode(false)} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button onClick={handleShare} className="flex-1 bg-green-600 hover:bg-green-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => window.print()} className="flex-1 btn-primary">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 pb-20 fade-in">
      {/* Header */}
      <div className="glass-card border-0 border-b border-white/20 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="hover:bg-purple-50 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gradient">Receipt Maker</h1>
              <p className="text-sm text-gray-600 font-medium">Generate payment receipts</p>
            </div>
          </div>
          <Button
            onClick={() => setPreviewMode(true)}
            className="btn-secondary rounded-xl"
            disabled={!receiptData.studentName || !receiptData.serviceName}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Receipt Form */}
        <Card className="modern-card slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                <Receipt className="h-5 w-5 text-emerald-600" />
              </div>
              <span>New Receipt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Receipt Number & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="receiptNumber" className="text-sm font-semibold text-gray-700">
                  Receipt Number
                </Label>
                <Input
                  id="receiptNumber"
                  value={receiptData.receiptNumber}
                  onChange={(e) => setReceiptData({ ...receiptData, receiptNumber: e.target.value })}
                  className="input-modern mt-2"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={receiptData.date}
                  onChange={(e) => setReceiptData({ ...receiptData, date: e.target.value })}
                  className="input-modern mt-2"
                />
              </div>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName" className="text-sm font-semibold text-gray-700">
                  Student Name *
                </Label>
                <Input
                  id="studentName"
                  placeholder="Enter student name"
                  value={receiptData.studentName}
                  onChange={(e) => setReceiptData({ ...receiptData, studentName: e.target.value })}
                  className="input-modern mt-2"
                />
              </div>
              <div>
                <Label htmlFor="studentPhone" className="text-sm font-semibold text-gray-700">
                  Phone
                </Label>
                <Input
                  id="studentPhone"
                  placeholder="+52 55 1234 5678"
                  value={receiptData.studentPhone}
                  onChange={(e) => setReceiptData({ ...receiptData, studentPhone: e.target.value })}
                  className="input-modern mt-2"
                />
              </div>
            </div>

            {/* Service & Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Service *</Label>
                <Select value={receiptData.serviceName} onValueChange={handleServiceSelect}>
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.name} value={service.name}>
                        {service.name} - ${service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                  Amount (MXN) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={receiptData.amount}
                  onChange={(e) => setReceiptData({ ...receiptData, amount: e.target.value })}
                  className="input-modern mt-2"
                />
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Payment Method</Label>
                <Select
                  value={receiptData.paymentMethod}
                  onValueChange={(value) => setReceiptData({ ...receiptData, paymentMethod: value })}
                >
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Payment Status</Label>
                <Select
                  value={receiptData.paymentStatus}
                  onValueChange={(value) => setReceiptData({ ...receiptData, paymentStatus: value })}
                >
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional notes..."
                value={receiptData.notes}
                onChange={(e) => setReceiptData({ ...receiptData, notes: e.target.value })}
                className="input-modern mt-2"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleGenerate}
                className="flex-1 btn-primary rounded-xl"
                disabled={!receiptData.studentName || !receiptData.serviceName || !receiptData.amount}
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate Receipt
              </Button>
              <Button
                onClick={() => setPreviewMode(true)}
                variant="outline"
                className="flex-1 rounded-xl"
                disabled={!receiptData.studentName || !receiptData.serviceName}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Receipts */}
        <Card className="modern-card slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <span>Recent Receipts</span>
              </div>
              <Button variant="ghost" className="text-purple-600 hover:bg-purple-50 font-semibold rounded-xl">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReceipts.map((receipt) => (
                <div key={receipt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-white">
                      <Receipt className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{receipt.id}</h4>
                      <p className="text-sm text-gray-600">
                        {receipt.student} • {receipt.service}
                      </p>
                      <p className="text-xs text-gray-500">{receipt.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${receipt.amount}</p>
                    <Badge className={receipt.status === "paid" ? "badge-success" : "badge-warning"}>
                      {receipt.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation currentPage="documents" />
    </div>
  )
}
