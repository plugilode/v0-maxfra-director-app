import { supabase, isSupabaseConfigured } from "./supabase"

// Mock data for when Supabase is not configured
const mockData = {
  stats: {
    totalStudents: 8,
    todaysClasses: 5,
    monthlyRevenue: 185000,
  },
  todaysAppointments: [
    {
      id: "1",
      start_time: "10:00",
      end_time: "13:00",
      status: "confirmed",
      students: { full_name: "Emma Rodriguez Sanchez" },
      services: { name: "Microblading Certification" },
      instructors: { name: "Fernando Ruiz" },
      locations: { name: "Polanco" },
    },
    {
      id: "2",
      start_time: "10:00",
      end_time: "13:00",
      status: "confirmed",
      students: { full_name: "Ana Gutierrez Morales" },
      services: { name: "Volume Lashes Course" },
      instructors: { name: "Maggy Acosta" },
      locations: { name: "Polanco" },
    },
  ],
  students: [
    {
      id: "1",
      full_name: "Emma Rodriguez Sanchez",
      phone: "+52 55 1234 5678",
      email: "emma.rodriguez@email.com",
      progress_percentage: 85,
      status: "active" as const,
      services: { name: "Microblading Certification" },
    },
    {
      id: "2",
      full_name: "Sophia Kim Lee",
      phone: "+52 55 2345 6789",
      email: "sophia.kim@email.com",
      progress_percentage: 92,
      status: "active" as const,
      services: { name: "Volume Lashes Course" },
    },
    {
      id: "3",
      full_name: "Isabella Chen Wang",
      phone: "+52 55 3456 7890",
      email: "isabella.chen@email.com",
      progress_percentage: 78,
      status: "active" as const,
      services: { name: "Henna Specialist Certification" },
    },
    {
      id: "4",
      full_name: "Maria Garcia Lopez",
      phone: "+52 55 4567 8901",
      email: "maria.garcia@email.com",
      progress_percentage: 100,
      status: "graduated" as const,
      services: { name: "Advanced Microblading" },
    },
    {
      id: "5",
      full_name: "Ana Gutierrez Morales",
      phone: "+52 55 5678 9012",
      email: "ana.gutierrez@email.com",
      progress_percentage: 65,
      status: "active" as const,
      services: { name: "Volume Lashes Course" },
    },
    {
      id: "6",
      full_name: "Carmen Flores Ruiz",
      phone: "+52 55 6789 0123",
      email: "carmen.flores@email.com",
      progress_percentage: 45,
      status: "active" as const,
      services: { name: "Classic Lashes Course" },
    },
    {
      id: "7",
      full_name: "Lucia Mendoza Torres",
      phone: "+52 55 7890 1234",
      email: "lucia.mendoza@email.com",
      progress_percentage: 88,
      status: "active" as const,
      services: { name: "Permanent Makeup Course" },
    },
    {
      id: "8",
      full_name: "Valentina Castro Jimenez",
      phone: "+52 55 8901 2345",
      email: "valentina.castro@email.com",
      progress_percentage: 55,
      status: "active" as const,
      services: { name: "Ombre Brows Technique" },
    },
  ],
  services: [
    {
      id: "1",
      name: "Advanced Microblading",
      duration_hours: 3.0,
      price: 4200,
      category: "course" as const,
      description: "Advanced techniques for experienced microblading artists",
    },
    {
      id: "2",
      name: "Volume Lashes Course",
      duration_hours: 3.0,
      price: 2800,
      category: "course" as const,
      description: "Professional volume lash extension certification program",
    },
    {
      id: "3",
      name: "Microblading Certification",
      duration_hours: 3.0,
      price: 3500,
      category: "course" as const,
      description: "Complete microblading certification course with hands-on practice",
    },
    {
      id: "4",
      name: "Classic Lashes Course",
      duration_hours: 2.5,
      price: 2200,
      category: "course" as const,
      description: "Foundation course for classic eyelash extensions",
    },
    {
      id: "5",
      name: "Henna Specialist Certification",
      duration_hours: 2.0,
      price: 1800,
      category: "course" as const,
      description: "Natural henna brow styling and application techniques",
    },
    {
      id: "6",
      name: "Permanent Makeup Course",
      duration_hours: 4.0,
      price: 5500,
      category: "course" as const,
      description: "Comprehensive permanent makeup artistry program",
    },
    {
      id: "7",
      name: "Ombre Brows Technique",
      duration_hours: 2.5,
      price: 3200,
      category: "course" as const,
      description: "Modern ombre and powder brow techniques",
    },
    {
      id: "8",
      name: "Microblading Touch-up",
      duration_hours: 1.0,
      price: 800,
      category: "service" as const,
      description: "Professional microblading touch-up and refresh service",
    },
    {
      id: "9",
      name: "Eyelash Application",
      duration_hours: 1.5,
      price: 600,
      category: "service" as const,
      description: "Professional eyelash extension application",
    },
    {
      id: "10",
      name: "Eyebrow Shaping",
      duration_hours: 0.5,
      price: 300,
      category: "service" as const,
      description: "Precision eyebrow shaping and styling",
    },
    {
      id: "11",
      name: "Henna Brow Treatment",
      duration_hours: 1.0,
      price: 450,
      category: "service" as const,
      description: "Natural henna eyebrow tinting and shaping",
    },
    {
      id: "12",
      name: "Lash Lifting",
      duration_hours: 1.0,
      price: 550,
      category: "service" as const,
      description: "Natural lash lifting and curling treatment",
    },
    {
      id: "13",
      name: "Eyebrow Lamination",
      duration_hours: 1.0,
      price: 650,
      category: "service" as const,
      description: "Eyebrow lamination for fuller, styled brows",
    },
    {
      id: "14",
      name: "Initial Consultation",
      duration_hours: 0.5,
      price: 200,
      category: "consultation" as const,
      description: "Comprehensive beauty consultation and treatment planning",
    },
    {
      id: "15",
      name: "Career Information Session",
      duration_hours: 1.0,
      price: 0,
      category: "consultation" as const,
      description: "Information about career opportunities in beauty industry",
    },
    {
      id: "16",
      name: "Course Overview",
      duration_hours: 0.75,
      price: 0,
      category: "consultation" as const,
      description: "Detailed overview of available certification courses",
    },
    {
      id: "17",
      name: "Academy Tour",
      duration_hours: 0.5,
      price: 0,
      category: "consultation" as const,
      description: "Guided tour of academy facilities and equipment",
    },
  ],
  locations: [
    {
      id: "1",
      name: "Polanco",
      address: "Presidente Masaryk 456, Polanco, Miguel Hidalgo, 11560 Ciudad de México, CDMX",
      phone: "+52 55 3333 4444",
      instructors: { name: "Carlos Rivera", phone: "+52 55 3333 4444" },
    },
    {
      id: "2",
      name: "Ciudad Brisas",
      address: "Av. Insurgentes Sur 123, Ciudad Brisas, Cuauhtémoc, 06700 Ciudad de México, CDMX",
      phone: "+52 55 1111 2222",
      instructors: { name: "Sofia Mendez", phone: "+52 55 1111 2222" },
    },
    {
      id: "3",
      name: "Perisur",
      address: "Periférico Sur 789, Jardines del Pedregal, Tlalpan, 14200 Ciudad de México, CDMX",
      phone: "+52 55 5555 6666",
      instructors: { name: "Diana Herrera", phone: "+52 55 5555 6666" },
    },
  ],
  appointments: [
    // Today's appointments (June 24, 2025)
    {
      id: "1",
      appointment_date: "2025-06-24",
      start_time: "10:00",
      end_time: "13:00",
      status: "confirmed" as const,
      students: { full_name: "Emma Rodriguez Sanchez" },
      services: { name: "Microblading Certification" },
      instructors: { name: "Fernando Ruiz" },
      locations: { name: "Polanco", address: "Presidente Masaryk 456, Polanco", phone: "+52 55 3333 4444" },
    },
    {
      id: "2",
      appointment_date: "2025-06-24",
      start_time: "10:00",
      end_time: "13:00",
      status: "confirmed" as const,
      students: { full_name: "Ana Gutierrez Morales" },
      services: { name: "Volume Lashes Course" },
      instructors: { name: "Maggy Acosta" },
      locations: { name: "Polanco", address: "Presidente Masaryk 456, Polanco", phone: "+52 55 3333 4444" },
    },
    // Tomorrow's appointments (June 25, 2025)
    {
      id: "3",
      appointment_date: "2025-06-25",
      start_time: "09:00",
      end_time: "12:00",
      status: "confirmed" as const,
      students: { full_name: "Isabella Chen Wang" },
      services: { name: "Henna Specialist Certification" },
      instructors: { name: "Pao Pao" },
      locations: {
        name: "Ciudad Brisas",
        address: "Av. Insurgentes Sur 123, Ciudad Brisas",
        phone: "+52 55 1111 2222",
      },
    },
    {
      id: "4",
      appointment_date: "2025-06-25",
      start_time: "14:00",
      end_time: "17:00",
      status: "pending" as const,
      students: { full_name: "Sophia Kim Lee" },
      services: { name: "Volume Lashes Course" },
      instructors: { name: "Maggy Acosta" },
      locations: { name: "Perisur", address: "Periférico Sur 789, Jardines del Pedregal", phone: "+52 55 5555 6666" },
    },
    // Day after tomorrow (June 26, 2025)
    {
      id: "5",
      appointment_date: "2025-06-26",
      start_time: "10:00",
      end_time: "13:00",
      status: "confirmed" as const,
      students: { full_name: "Carmen Flores Ruiz" },
      services: { name: "Classic Lashes Course" },
      instructors: { name: "Fernando Ruiz" },
      locations: { name: "Polanco", address: "Presidente Masaryk 456, Polanco", phone: "+52 55 3333 4444" },
    },
    {
      id: "6",
      appointment_date: "2025-06-26",
      start_time: "15:00",
      end_time: "19:00",
      status: "confirmed" as const,
      students: { full_name: "Lucia Mendoza Torres" },
      services: { name: "Permanent Makeup Course" },
      instructors: { name: "Rosi R" },
      locations: {
        name: "Ciudad Brisas",
        address: "Av. Insurgentes Sur 123, Ciudad Brisas",
        phone: "+52 55 1111 2222",
      },
    },
    // Future appointments
    {
      id: "7",
      appointment_date: "2025-06-27",
      start_time: "11:00",
      end_time: "13:30",
      status: "pending" as const,
      students: { full_name: "Valentina Castro Jimenez" },
      services: { name: "Ombre Brows Technique" },
      instructors: { name: "Rosi R" },
      locations: { name: "Perisur", address: "Periférico Sur 789, Jardines del Pedregal", phone: "+52 55 5555 6666" },
    },
    {
      id: "8",
      appointment_date: "2025-06-30",
      start_time: "14:00",
      end_time: "15:00",
      status: "pending" as const,
      students: { full_name: "Emma Rodriguez Sanchez" },
      services: { name: "Microblading Touch-up" },
      instructors: { name: "Fernando Ruiz" },
      locations: { name: "Polanco", address: "Presidente Masaryk 456, Polanco", phone: "+52 55 3333 4444" },
    },
  ],
}

// Dashboard Statistics
export async function getDashboardStats() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.stats
  }

  try {
    // Get total students
    const { count: totalStudents } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")

    // Get today's appointments
    const today = new Date().toISOString().split("T")[0]
    const { count: todaysClasses } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("appointment_date", today)
      .in("status", ["confirmed", "pending"])

    // Get monthly revenue (current month)
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    const { data: monthlyReceipts } = await supabase
      .from("receipts")
      .select("amount")
      .eq("payment_status", "paid")
      .gte("issued_date", `${currentMonth}-01`)
      .lt("issued_date", `${currentMonth}-32`)

    const monthlyRevenue = monthlyReceipts?.reduce((sum, receipt) => sum + receipt.amount, 0) || 0

    return {
      totalStudents: totalStudents || 0,
      todaysClasses: todaysClasses || 0,
      monthlyRevenue,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return mockData.stats
  }
}

// Get today's appointments with student and service details
export async function getTodaysAppointments() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.todaysAppointments
  }

  try {
    const today = new Date().toISOString().split("T")[0]

    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        students (full_name),
        services (name),
        instructors (name),
        locations (name)
      `)
      .eq("appointment_date", today)
      .in("status", ["confirmed", "pending"])
      .order("start_time")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching today's appointments:", error)
    return mockData.todaysAppointments
  }
}

// Get appointments for calendar view
export async function getAppointments(days = 7) {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setDate(today.getDate() + days)

    return mockData.appointments.filter((apt) => {
      const aptDate = new Date(apt.appointment_date)
      return aptDate >= today && aptDate <= endDate
    })
  }

  try {
    const today = new Date()
    const endDate = new Date(today)
    endDate.setDate(today.getDate() + days)

    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        students (full_name),
        services (name),
        instructors (name),
        locations (name, address, phone)
      `)
      .gte("appointment_date", today.toISOString().split("T")[0])
      .lte("appointment_date", endDate.toISOString().split("T")[0])
      .order("appointment_date")
      .order("start_time")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return mockData.appointments
  }
}

// Get all students
export async function getStudents() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.students
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .select(`
        *,
        services (name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching students:", error)
    return mockData.students
  }
}

// Get all services
export async function getServices() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.services
  }

  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("category")
      .order("price", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching services:", error)
    return mockData.services
  }
}

// Get all locations
export async function getLocations() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.locations
  }

  try {
    const { data, error } = await supabase
      .from("locations")
      .select(`
        *,
        instructors (name, phone)
      `)
      .order("name")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching locations:", error)
    return mockData.locations
  }
}

// Get students eligible for diploma
export async function getEligibleStudents() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.students.filter((s) => s.status === "graduated")
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .select(`
        *,
        services (name)
      `)
      .eq("status", "graduated")
      .order("full_name")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching eligible students:", error)
    return mockData.students.filter((s) => s.status === "graduated")
  }
}

// Get students in progress
export async function getStudentsInProgress() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Using mock data - Supabase not configured")
    return mockData.students.filter((s) => s.status === "active" && s.progress_percentage < 100)
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .select(`
        *,
        services (name)
      `)
      .eq("status", "active")
      .lt("progress_percentage", 100)
      .order("progress_percentage", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching students in progress:", error)
    return mockData.students.filter((s) => s.status === "active" && s.progress_percentage < 100)
  }
}

// Add new student
export async function addStudent(studentData: {
  full_name: string
  phone: string
  email?: string
  program_id: string
}) {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Mock mode - would add student:", studentData)
    return {
      id: Date.now().toString(),
      ...studentData,
      enrollment_date: new Date().toISOString().split("T")[0],
      progress_percentage: 0,
      status: "active" as const,
    }
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .insert({
        ...studentData,
        enrollment_date: new Date().toISOString().split("T")[0],
        progress_percentage: 0,
        status: "active",
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error adding student:", error)
    throw error
  }
}

// Create new appointment
export async function createAppointment(appointmentData: {
  student_id: string
  instructor_id: string
  service_id: string
  location_id: string
  appointment_date: string
  start_time: string
  end_time: string
  notes?: string
}) {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Mock mode - would create appointment:", appointmentData)
    return {
      id: Date.now().toString(),
      ...appointmentData,
      status: "pending" as const,
    }
  }

  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        ...appointmentData,
        status: "pending",
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating appointment:", error)
    throw error
  }
}

// Search students by name
export async function searchStudents(query: string) {
  if (!query) return []

  if (!isSupabaseConfigured || !supabase) {
    return mockData.students.filter((s) =>
      s.full_name.toLowerCase().includes(query.toLowerCase()),
    )
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .select(
        `*,
        services (name)
      `,
      )
      .ilike("full_name", `%${query}%`)
      .order("full_name")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error searching students:", error)
    return []
  }
}

// Check if appointment slot is free
export async function isAppointmentAvailable(
  appointment_date: string,
  start_time: string,
  end_time: string,
  location_name: string,
) {
  const newStart = new Date(`${appointment_date}T${start_time}`)
  const newEnd = new Date(`${appointment_date}T${end_time}`)

  if (!isSupabaseConfigured || !supabase) {
    return !mockData.appointments.some((apt) => {
      return (
        apt.appointment_date === appointment_date &&
        apt.locations.name === location_name &&
        new Date(`${apt.appointment_date}T${apt.start_time}`) < newEnd &&
        new Date(`${apt.appointment_date}T${apt.end_time}`) > newStart
      )
    })
  }

  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("start_time,end_time,locations(name)")
      .eq("appointment_date", appointment_date)
      .eq("locations.name", location_name)

    if (error) throw error

    return !(data || []).some((apt) => {
      return (
        new Date(`${appointment_date}T${apt.start_time}`) < newEnd &&
        new Date(`${appointment_date}T${apt.end_time}`) > newStart
      )
    })
  } catch (error) {
    console.error("Error checking appointment availability:", error)
    return false
  }
}

// --- Local student helpers ---
function getStoredStudents() {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem("localStudents")
  return raw ? JSON.parse(raw) : []
}

function saveStoredStudents(students: any[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("localStudents", JSON.stringify(students))
}

export function addLocalStudent(student: any) {
  const students = getStoredStudents()
  students.push(student)
  saveStoredStudents(students)
  return student
}

export function updateLocalStudent(id: string, data: any) {
  const students = getStoredStudents().map((s: any) =>
    s.id === id ? { ...s, ...data } : s,
  )
  saveStoredStudents(students)
}

export function removeLocalStudent(id: string) {
  const students = getStoredStudents().filter((s: any) => s.id !== id)
  saveStoredStudents(students)
}

export function getLocalStudents() {
  return getStoredStudents()
}
