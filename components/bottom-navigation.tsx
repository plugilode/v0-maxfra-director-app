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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl z-40">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => (window.location.href = item.href)}
            className={cn(
              "flex flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-all duration-300 relative",
              currentPage === item.id ? "text-purple-600" : "text-gray-600 hover:text-purple-600",
            )}
          >
            {currentPage === item.id && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            )}
            <item.icon
              className={cn(
                "h-5 w-5 mb-1 transition-all duration-300",
                currentPage === item.id ? "scale-110" : "hover:scale-105",
              )}
            />
            <span className="transition-all duration-300">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
