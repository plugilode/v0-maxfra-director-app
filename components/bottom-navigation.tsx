"use client"

import { Home, Calendar, Users, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { designSystem } from "@/lib/design-system"

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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => (window.location.href = item.href)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-2 text-xs transition-all duration-200 relative",
                isActive 
                  ? "text-white" 
                  : "text-gray-600 hover:text-purple-600"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl"></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <item.icon className={cn(
                  "mb-1 transition-all duration-200",
                  isActive ? "h-6 w-6" : "h-5 w-5"
                )} />
                <span className={cn(
                  "font-medium transition-all duration-200",
                  isActive ? "text-xs" : "text-[10px]"
                )}>
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
