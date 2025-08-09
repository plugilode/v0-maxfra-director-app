import { jsPDF } from "jspdf"

export interface ReceiptData {
  receiptNumber: string
  student: string
  amount: string
  method: string
}

export function generateReceiptPDF(data: ReceiptData) {
  const doc = new jsPDF()
  doc.text(`Receipt #${data.receiptNumber}`, 10, 10)
  doc.text(`Student: ${data.student}`, 10, 20)
  doc.text(`Amount: ${data.amount}`, 10, 30)
  doc.text(`Payment Method: ${data.method}`, 10, 40)
  doc.save(`receipt_${data.receiptNumber}.pdf`)
}

export interface DiplomaData {
  student: string
  program: string
  date?: string
}

export function generateDiplomaPDF(data: DiplomaData) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "letter" })
  doc.setFontSize(24)
  doc.text("Diploma of Completion", 72, 72)
  doc.setFontSize(18)
  doc.text(`Presented to ${data.student}`, 72, 108)
  doc.setFontSize(14)
  doc.text(`For completing ${data.program}`, 72, 134)
  if (data.date) {
    doc.text(`Date: ${data.date}`, 72, 160)
  }
  doc.save(`diploma_${data.student.replace(/\s+/g, "_").toLowerCase()}.pdf`)
}
