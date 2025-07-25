"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  FileText,
  GraduationCap,
  Receipt,
  UserPlus,
  Settings,
  Share2,
  Download,
  Eye,
  Edit,
  Printer,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Documents() {
  const documentCategories = [
    {
      id: "diplomas",
      title: "Diploma Maker",
      description: "Create and customize graduation diplomas",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      count: 3,
      href: "/documents/diplomas",
    },
    {
      id: "receipts",
      title: "Receipt Maker",
      description: "Generate payment receipts and invoices",
      icon: Receipt,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      count: 12,
      href: "/documents/receipts",
    },
    {
      id: "forms",
      title: "Sign-up Forms",
      description: "Student registration and enrollment forms",
      icon: UserPlus,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      count: 5,
      href: "/documents/forms",
    },
    {
      id: "templates",
      title: "Document Templates",
      description: "Customizable document templates library",
      icon: FileText,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      count: 8,
      href: "/documents/templates",
    },
  ]

  const quickActions = [
    {
      title: "System Settings",
      description: "Colors, hours, database configuration",
      icon: Settings,
      color: "from-indigo-500 to-indigo-600",
      href: "/settings",
    },
    {
      title: "Share Templates",
      description: "Share documents via WhatsApp",
      icon: Share2,
      color: "from-green-500 to-green-600",
      href: "/documents/share",
    },
    {
      title: "Print Manager",
      description: "Manage printable documents",
      icon: Printer,
      color: "from-pink-500 to-pink-600",
      href: "/documents/print",
    },
  ]

  const recentDocuments = [
    {
      id: 1,
      name: "Maria Garcia - Diploma",
      type: "Diploma",
      date: "2025-01-25",
      status: "Ready",
      color: "badge-success",
    },
    {
      id: 2,
      name: "Receipt #REC-008",
      type: "Receipt",
      date: "2025-01-24",
      status: "Sent",
      color: "badge-info",
    },
    {
      id: 3,
      name: "Student Registration Form",
      type: "Form",
      date: "2025-01-23",
      status: "Draft",
      color: "badge-warning",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 pb-20 fade-in">
      {/* Modern Header */}
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
              <h1 className="text-xl font-bold text-gradient">Document Center</h1>
              <p className="text-sm text-gray-600 font-medium">Templates, Forms & Settings</p>
            </div>
          </div>
          <Button className="btn-primary rounded-xl" onClick={() => (window.location.href = "/settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Document Categories */}
        <div className="slide-up">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Document Makers</h2>
          <div className="grid grid-cols-1 gap-4">
            {documentCategories.map((category, index) => (
              <Card
                key={category.id}
                className="modern-card cursor-pointer hover:scale-[1.02] transition-all duration-300 bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => (window.location.href = category.href)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.bgColor}`}>
                        <category.icon
                          className={`h-8 w-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{category.title}</h3>
                        <p className="text-gray-600 font-medium">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="badge-info mb-2">{category.count} items</Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" className="btn-secondary text-xs px-3 py-1 rounded-lg">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                className={`h-16 bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-2xl border-0 justify-start px-6`}
                onClick={() => (window.location.href = action.href)}
              >
                <div className="flex items-center space-x-4">
                  <action.icon className="h-6 w-6" />
                  <div className="text-left">
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
            <Button variant="ghost" className="text-purple-600 hover:bg-purple-50 font-semibold rounded-xl">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentDocuments.map((doc, index) => (
              <Card key={doc.id} className="modern-card bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doc.type} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={doc.color}>{doc.status}</Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="hover:bg-purple-50 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-purple-50 rounded-lg">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-purple-50 rounded-lg">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
