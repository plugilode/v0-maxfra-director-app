"use client"

import { Home, Calendar, Users, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  currentPage: string
}

export function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    { id: "calendar", label: "Calendar", icon: Calendar, href: "/calendar" },
    { id: "students", label: "Students", icon: Users, href: "/students" },
    { id: "documents", label: "Documents", icon: FileText, href: "/documents" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => (window.location.href = item.href)}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-1 text-xs",
              currentPage === item.id ? "text-purple-600 bg-purple-50" : "text-gray-600 hover:text-purple-600",
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
