"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Palette, Clock, Database, Bell, Globe, Save, RefreshCw, Eye, Moon } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { loadSettings, saveSettings, resetSettings, applyThemeSettings, type AppSettings } from "@/lib/settings"

export default function Settings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [settings, setSettings] = useState<AppSettings>({
    primaryColor: "#8B5CF6",
    secondaryColor: "#EC4899",
    darkMode: false,
    compactMode: false,
    openTime: "09:00",
    closeTime: "18:00",
    workDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    language: "es",
    timezone: "America/Mexico_City",
    currency: "MXN",
    dateFormat: "DD/MM/YYYY",
    emailNotifications: true,
    whatsappNotifications: true,
    reminderTime: "24",
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "365",
  })

  const colorPresets = [
    { name: "Purple", primary: "#8B5CF6", secondary: "#EC4899" },
    { name: "Blue", primary: "#3B82F6", secondary: "#06B6D4" },
    { name: "Green", primary: "#10B981", secondary: "#F59E0B" },
    { name: "Pink", primary: "#EC4899", secondary: "#8B5CF6" },
    { name: "Orange", primary: "#F97316", secondary: "#EF4444" },
  ]

  // Load settings on component mount
  useEffect(() => {
    async function initializeSettings() {
      try {
        const loadedSettings = await loadSettings()
        setSettings(loadedSettings)
        applyThemeSettings(loadedSettings)
      } catch (error) {
        console.error("Failed to load settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings. Using defaults.",
          variant: "destructive",
          duration: 3000,
        })
      } finally {
        setInitialLoading(false)
      }
    }

    initializeSettings()
  }, [toast])

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveSettings(settings)
      applyThemeSettings(settings)

      toast({
        title: "Settings Saved",
        description: "Your preferences have been saved successfully.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    try {
      const defaultSettings = await resetSettings()
      setSettings(defaultSettings)
      applyThemeSettings(defaultSettings)

      toast({
        title: "Settings Reset",
        description: "All settings have been reset to default values.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Failed to reset settings:", error)
      toast({
        title: "Error",
        description: "Failed to reset settings. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const updateSetting = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)

    // Apply theme changes immediately for visual feedback
    if (key === "primaryColor" || key === "secondaryColor" || key === "darkMode" || key === "compactMode") {
      applyThemeSettings(newSettings)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 pb-20 fade-in">
        <div className="glass-card border-0 border-b border-white/20 px-6 py-4 sticky top-0 z-40">
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
              <h1 className="text-xl font-bold text-gradient">System Settings</h1>
              <p className="text-sm text-gray-600 font-medium">Loading...</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="modern-card p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading settings...</p>
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
              <h1 className="text-xl font-bold text-gradient">System Settings</h1>
              <p className="text-sm text-gray-600 font-medium">Customize your MAXFRA experience</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset} className="rounded-xl bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} className="btn-primary rounded-xl" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Appearance Settings */}
        <Card className="modern-card slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <Palette className="h-5 w-5 text-purple-600" />
              </div>
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color Presets */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Color Theme</Label>
              <div className="grid grid-cols-5 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    className="flex flex-col items-center p-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary,
                      })
                    }
                  >
                    <div className="flex space-x-1 mb-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    </div>
                    <span className="text-xs font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Display Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Moon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Dark Mode</span>
                </div>
                <Switch checked={settings.darkMode} onCheckedChange={(checked) => updateSetting("darkMode", checked)} />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Compact Mode</span>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => updateSetting("compactMode", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="modern-card slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <span>Business Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="openTime" className="text-sm font-semibold text-gray-700">
                  Opening Time
                </Label>
                <Input
                  id="openTime"
                  type="time"
                  value={settings.openTime}
                  onChange={(e) => updateSetting("openTime", e.target.value)}
                  className="input-modern mt-2"
                />
              </div>
              <div>
                <Label htmlFor="closeTime" className="text-sm font-semibold text-gray-700">
                  Closing Time
                </Label>
                <Input
                  id="closeTime"
                  type="time"
                  value={settings.closeTime}
                  onChange={(e) => updateSetting("closeTime", e.target.value)}
                  className="input-modern mt-2"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Working Days</Label>
              <div className="grid grid-cols-4 gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <button
                    key={day}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      settings.workDays.includes(day.toLowerCase())
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-200"
                        : "bg-gray-100 text-gray-600 border-2 border-gray-200"
                    }`}
                    onClick={() => {
                      const dayLower = day.toLowerCase()
                      const newWorkDays = settings.workDays.includes(dayLower)
                        ? settings.workDays.filter((d) => d !== dayLower)
                        : [...settings.workDays, dayLower]
                      updateSetting("workDays", newWorkDays)
                    }}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="modern-card slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MXN">MXN (Peso Mexicano)</SelectItem>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Mexico_City">Mexico City</SelectItem>
                    <SelectItem value="America/Cancun">Cancun</SelectItem>
                    <SelectItem value="America/Tijuana">Tijuana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Date Format</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="modern-card slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                <Bell className="h-5 w-5 text-orange-600" />
              </div>
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="font-medium">Email Notifications</span>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="font-medium">WhatsApp Notifications</span>
                <Switch
                  checked={settings.whatsappNotifications}
                  onCheckedChange={(checked) => updateSetting("whatsappNotifications", checked)}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Reminder Time (hours before)</Label>
              <Select value={settings.reminderTime} onValueChange={(value) => updateSetting("reminderTime", value)}>
                <SelectTrigger className="input-modern mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="48">48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="modern-card slide-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                <Database className="h-5 w-5 text-indigo-600" />
              </div>
              <span>Database & Backup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <span className="font-medium block">Auto Backup</span>
                <span className="text-sm text-gray-600">Automatically backup your data</span>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSetting("autoBackup", checked)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => updateSetting("backupFrequency", value)}
                >
                  <SelectTrigger className="input-modern mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Data Retention (days)</Label>
                <Input
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => updateSetting("dataRetention", e.target.value)}
                  className="input-modern mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation currentPage="settings" />
    </div>
  )
}
