"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, FileText, Edit3, Trash2, Download, Share } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { designSystem } from "@/lib/design-system"

interface Template {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  lastModified: string
}

export default function Documents() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [newTemplateTitle, setNewTemplateTitle] = useState("")
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("templates")
    if (stored) {
      setTemplates(JSON.parse(stored))
    } else {
      const defaults = [
        {
          id: "1",
          title: "Student Registration Contract",
          content: "MAXFRA Beauty Academy\nStudent Registration Agreement\n\nStudent Name: _________________\nCourse: _________________\nStart Date: _________________\n\nTerms and Conditions:\n1. Payment terms\n2. Course requirements\n3. Academy policies\n\nStudent Signature: _________________\nDate: _________________",
          category: "Contracts",
          createdAt: "2024-01-15",
          lastModified: "2024-01-15"
        },
        {
          id: "2", 
          title: "Course Completion Certificate",
          content: "MAXFRA Beauty Academy\nCertificate of Completion\n\nThis certifies that\n_________________\nhas successfully completed the\n_________________\ncourse on _________________\n\nDirector Signature: _________________",
          category: "Certificates",
          createdAt: "2024-01-10",
          lastModified: "2024-01-10"
        },
        {
          id: "3",
          title: "Payment Receipt Template",
          content: "MAXFRA Beauty Academy\nPayment Receipt\n\nReceipt #: _________________\nStudent: _________________\nAmount: _________________\nDate: _________________\nPayment Method: _________________\n\nThank you for your payment!",
          category: "Receipts",
          createdAt: "2024-01-05",
          lastModified: "2024-01-05"
        }
      ]
      setTemplates(defaults)
      saveTemplates(defaults)
    }
  }, [])

  const saveTemplates = (t: Template[]) => {
    setTemplates(t)
    localStorage.setItem("templates", JSON.stringify(t))
  }

  const updateTemplate = (id: string, content: string) => {
    const updated = templates.map((t) => (t.id === id ? { ...t, content, lastModified: new Date().toISOString().split('T')[0] } : t))
    saveTemplates(updated)
  }

  const addTemplate = () => {
    if (!newTemplateTitle.trim()) return
    const newT = {
      id: Date.now().toString(),
      title: newTemplateTitle,
      content: "New template content...",
      category: "General",
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    }
    const updated = [...templates, newT]
    saveTemplates(updated)
    setNewTemplateTitle("")
  }

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id)
    saveTemplates(updated)
    if (editingTemplate?.id === id) {
      setEditingTemplate(null)
    }
  }

  const categories = [...new Set(templates.map(t => t.category))]
  const stats = {
    total: templates.length,
    contracts: templates.filter(t => t.category === "Contracts").length,
    certificates: templates.filter(t => t.category === "Certificates").length,
    receipts: templates.filter(t => t.category === "Receipts").length,
  }

  const handleShare = (template: Template) => {
    const shareText = `${template.title}\n\n${template.content}`
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  }

  if (editingTemplate) {
    return (
      <div className={designSystem.layout.page}>
        {/* Edit Template Header */}
        <div className={designSystem.components.header.gradient}>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setEditingTemplate(null)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                  <Edit3 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-white text-xl">Edit Template</h1>
                <p className="text-white/80 text-sm">{editingTemplate.title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={designSystem.layout.container}>
          <Card className={designSystem.components.card.base}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="templateContent" className="text-sm font-semibold text-gray-900">Template Content</Label>
                  <textarea
                    id="templateContent"
                    value={editingTemplate.content}
                    onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                    className="w-full h-96 mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                    placeholder="Enter template content..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className={`${designSystem.components.button.primary} flex-1`}
                    onClick={() => {
                      updateTemplate(editingTemplate.id, editingTemplate.content)
                      setEditingTemplate(null)
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setEditingTemplate(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                <FileText className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-white text-xl">Document Templates</h1>
              <p className="text-white/80 text-sm">{stats.total} templates available</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => setNewTemplateTitle("New Template")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className={designSystem.layout.container}>
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-3">
          <Card className={`${designSystem.components.card.base} bg-blue-50 border border-blue-200`}>
            <CardContent className="p-3 text-center">
              <FileText className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-blue-600 font-medium">Total</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-green-50 border border-green-200`}>
            <CardContent className="p-3 text-center">
              <Edit3 className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.contracts}</p>
              <p className="text-xs text-green-600 font-medium">Contracts</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-purple-50 border border-purple-200`}>
            <CardContent className="p-3 text-center">
              <Download className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.certificates}</p>
              <p className="text-xs text-purple-600 font-medium">Certificates</p>
            </CardContent>
          </Card>
          <Card className={`${designSystem.components.card.base} bg-orange-50 border border-orange-200`}>
            <CardContent className="p-3 text-center">
              <Share className="h-6 w-6 text-orange-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.receipts}</p>
              <p className="text-xs text-orange-600 font-medium">Receipts</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Template */}
        <Card className={designSystem.components.card.primary}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Plus className="h-5 w-5 text-purple-600" />
              <Label htmlFor="title" className="text-sm font-semibold text-gray-900">Create New Template</Label>
            </div>
            <div className="flex space-x-3 mt-3">
              <Input
                id="title"
                placeholder="Enter template title..."
                value={newTemplateTitle}
                onChange={(e) => setNewTemplateTitle(e.target.value)}
                className="flex-1 h-10"
              />
              <Button 
                size="sm" 
                className={designSystem.components.button.gradient}
                onClick={addTemplate}
                disabled={!newTemplateTitle.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Templates by Category */}
        <div className={designSystem.layout.section}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Templates</h2>
            <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-purple-200 via-blue-200 to-transparent rounded"></div>
          </div>

          {categories.map((category) => {
            const categoryTemplates = templates.filter(t => t.category === category)
            if (categoryTemplates.length === 0) return null

            return (
              <div key={category} className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                    {category}
                  </Badge>
                  <span className="text-sm text-gray-500">{categoryTemplates.length} templates</span>
                </div>
                
                <div className="space-y-3">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className={`${designSystem.components.card.elevated} hover:shadow-xl transition-all duration-200`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{template.title}</h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                              {template.content.substring(0, 100)}...
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">
                                Created: {template.createdAt}
                              </span>
                              <span className="text-xs text-gray-500">
                                Modified: {template.lastModified}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleShare(template)}
                              className="h-8 w-8 p-0"
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className={designSystem.components.button.secondary}
                              onClick={() => setEditingTemplate(template)}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteTemplate(template.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          {templates.length === 0 && (
            <Card className={designSystem.components.card.primary}>
              <CardContent className="p-8 text-center">
                <FileText className={`${designSystem.icons.sizes.xxl} text-purple-400 mx-auto mb-4`} />
                <p className="text-gray-600 text-lg font-medium">No document templates yet</p>
                <p className="text-gray-500 text-sm mt-2">Create your first template to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation currentPage="documents" />
    </div>
  )
}
