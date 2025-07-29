import { supabase, isSupabaseConfigured } from "./supabase"

export interface AppSettings {
  // Appearance
  primaryColor: string
  secondaryColor: string
  darkMode: boolean
  compactMode: boolean

  // Business Hours
  openTime: string
  closeTime: string
  workDays: string[]

  // System
  language: string
  timezone: string
  currency: string
  dateFormat: string

  // Notifications
  emailNotifications: boolean
  whatsappNotifications: boolean
  reminderTime: string

  // Database
  autoBackup: boolean
  backupFrequency: string
  dataRetention: string
}

const DEFAULT_SETTINGS: AppSettings = {
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
}

// Load settings from localStorage and Supabase
export async function loadSettings(): Promise<AppSettings> {
  try {
    // First try localStorage for immediate loading
    const localSettings = localStorage.getItem("maxfra-settings")
    let settings = DEFAULT_SETTINGS

    if (localSettings) {
      try {
        settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localSettings) }
      } catch (error) {
        console.error("Failed to parse local settings:", error)
      }
    }

    // If Supabase is configured, try to load from database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("app_settings").select("*").single()

        if (data && !error) {
          settings = { ...settings, ...data.settings }
          // Update localStorage with server data
          localStorage.setItem("maxfra-settings", JSON.stringify(settings))
        }
      } catch (error) {
        console.error("Failed to load settings from database:", error)
      }
    }

    return settings
  } catch (error) {
    console.error("Failed to load settings:", error)
    return DEFAULT_SETTINGS
  }
}

// Save settings to localStorage and Supabase
export async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    // Save to localStorage immediately
    localStorage.setItem("maxfra-settings", JSON.stringify(settings))

    // If Supabase is configured, save to database
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("app_settings").upsert({
          id: "main",
          settings: settings,
          updated_at: new Date().toISOString(),
        })

        if (error) {
          console.error("Failed to save settings to database:", error)
          throw error
        }
      } catch (error) {
        console.error("Database save failed:", error)
        // Don't throw here - localStorage save succeeded
      }
    }
  } catch (error) {
    console.error("Failed to save settings:", error)
    throw error
  }
}

// Apply theme settings to DOM
export function applyThemeSettings(settings: AppSettings): void {
  try {
    const root = document.documentElement

    // Apply color theme
    root.style.setProperty("--maxfra-primary", settings.primaryColor)
    root.style.setProperty("--maxfra-secondary", settings.secondaryColor)

    // Apply dark mode
    if (settings.darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply compact mode
    if (settings.compactMode) {
      root.classList.add("compact")
    } else {
      root.classList.remove("compact")
    }

    // Store in CSS custom properties for easy access
    root.style.setProperty("--business-open-time", settings.openTime)
    root.style.setProperty("--business-close-time", settings.closeTime)
  } catch (error) {
    console.error("Failed to apply theme settings:", error)
  }
}

// Reset settings to defaults
export async function resetSettings(): Promise<AppSettings> {
  try {
    localStorage.removeItem("maxfra-settings")

    if (isSupabaseConfigured && supabase) {
      await supabase.from("app_settings").delete().eq("id", "main")
    }

    return DEFAULT_SETTINGS
  } catch (error) {
    console.error("Failed to reset settings:", error)
    return DEFAULT_SETTINGS
  }
}
