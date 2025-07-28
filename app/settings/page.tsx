"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Settings() {
  const [notify, setNotify] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("settings")
    if (stored) {
      const s = JSON.parse(stored)
      setNotify(!!s.notify)
      setDarkMode(!!s.darkMode)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ notify, darkMode }),
    )
    alert("Settings saved")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="notify" className="text-sm font-medium">
            Enable Notifications
          </Label>
          <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dark" className="text-sm font-medium">
            Dark Mode
          </Label>
          <Switch id="dark" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        <div className="pt-6">
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>

      <BottomNavigation currentPage="settings" />
    </div>
  )
}
