# MAXFRA Director App - Complete Technical Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features & Functionality](#features--functionality)
4. [Architecture](#architecture)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [User Interface](#user-interface)
8. [Installation & Setup](#installation--setup)
9. [Configuration](#configuration)
10. [Deployment](#deployment)
11. [Security](#security)
12. [Performance](#performance)
13. [Testing](#testing)
14. [Maintenance](#maintenance)
15. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

### What is MAXFRA Director App?
The MAXFRA Director App is a comprehensive **Beauty Academy Management System** designed specifically for MAXFRA Beauty Academy in Mexico City. It's a modern, mobile-first web application that streamlines academy operations, student management, appointment scheduling, and document generation.

### Purpose & Goals
- **Centralized Management**: Single platform for all academy operations
- **Student Lifecycle Management**: From enrollment to graduation
- **Appointment Scheduling**: Multi-location, multi-instructor booking system
- **Document Generation**: Automated diplomas, receipts, and forms
- **Real-time Analytics**: Dashboard with key performance indicators
- **Mobile-First Design**: Optimized for tablets and mobile devices

### Target Users
- **Academy Directors**: Full system access and management
- **Instructors**: Schedule management and student progress tracking
- **Administrative Staff**: Student enrollment and document processing
- **Students**: Limited access for progress tracking (future feature)

---

## 🛠 Technology Stack

### Frontend Framework
- **Next.js 14** (App Router)
  - React 18 with Server Components
  - TypeScript for type safety
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - API Routes for backend functionality

### UI/UX Technologies
- **Tailwind CSS 3.4**
  - Utility-first CSS framework
  - Custom design system with MAXFRA branding
  - Responsive design patterns
  - Dark mode support
- **shadcn/ui Components**
  - Radix UI primitives
  - Accessible component library
  - Customizable design system
- **Lucide React Icons**
  - Modern icon library
  - Consistent iconography
  - Tree-shakeable imports

### Database & Backend
- **Supabase** (PostgreSQL)
  - Real-time database
  - Row Level Security (RLS)
  - Built-in authentication
  - Edge functions
  - File storage
- **Prisma ORM** (Optional)
  - Type-safe database queries
  - Database migrations
  - Schema management

### State Management
- **React Hooks**
  - useState for local state
  - useEffect for side effects
  - Custom hooks for reusable logic
- **Context API**
  - Global state management
  - Theme and settings context

### Development Tools
- **TypeScript 5.0**
  - Static type checking
  - Enhanced IDE support
  - Better code documentation
- **ESLint & Prettier**
  - Code linting and formatting
  - Consistent code style
- **Husky & lint-staged**
  - Pre-commit hooks
  - Automated code quality checks

### Deployment & Hosting
- **Vercel Platform**
  - Automatic deployments
  - Edge network distribution
  - Serverless functions
  - Environment variable management
- **Custom Domain**
  - SSL certificate
  - CDN optimization

---

## ⚡ Features & Functionality

### 1. Dashboard & Analytics
#### Key Metrics Display
- **Total Students**: Active enrollment count
- **Today's Classes**: Daily appointment overview
- **Monthly Revenue**: Financial performance tracking
- **Satisfaction Rate**: Student feedback metrics

#### Real-time Updates
- Live appointment status changes
- Student progress notifications
- Revenue tracking updates
- System health monitoring

#### Quick Actions
- One-click appointment booking
- Rapid student enrollment
- Instant receipt generation
- Direct diploma creation

### 2. Student Management System
#### Student Profiles
\`\`\`typescript
interface Student {
  id: string
  full_name: string
  phone: string
  email?: string
  program_id: string
  enrollment_date: Date
  progress_percentage: number
  status: 'active' | 'graduated' | 'suspended'
  created_at: Date
}
\`\`\`

#### Features
- **Complete Student Lifecycle**: Enrollment to graduation
- **Progress Tracking**: Visual progress bars and milestones
- **Communication History**: Phone and email interaction logs
- **Document Management**: Associated receipts, forms, and certificates
- **Performance Analytics**: Individual and cohort analysis

### 3. Advanced Calendar System
#### Multi-View Calendar
- **1, 3, 5, 7, 10, 14, 30 Day Views**: Flexible time range selection
- **Location-Based Grouping**: Appointments organized by academy location
- **Instructor Scheduling**: Multi-instructor appointment management
- **Real-time Availability**: Live booking status updates

#### Appointment Management
\`\`\`typescript
interface Appointment {
  id: string
  student_id: string
  instructor_id: string
  service_id: string
  location_id: string
  appointment_date: Date
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}
\`\`\`

#### Smart Scheduling Features
- **Conflict Detection**: Automatic double-booking prevention
- **Instructor Availability**: Real-time schedule checking
- **Location Capacity**: Room and equipment availability
- **Automated Reminders**: WhatsApp and email notifications

### 4. Multi-Location Management
#### Academy Locations
- **Polanco**: Premium location with advanced equipment
- **Ciudad Brisas**: Main training facility
- **Perisur**: Specialized certification center

#### Location Features
- **Individual Scheduling**: Location-specific appointment booking
- **Instructor Assignment**: Location-based instructor management
- **Equipment Tracking**: Specialized tool and equipment availability
- **Performance Metrics**: Location-specific analytics

### 5. Service & Course Catalog
#### Course Categories
- **Certification Courses**: Full professional programs
- **Individual Services**: Single-session treatments
- **Consultation Services**: Assessment and planning sessions

#### Service Management
\`\`\`typescript
interface Service {
  id: string
  name: string
  duration_hours: number
  price: number
  category: 'course' | 'service' | 'consultation'
  description: string
  instructor_requirements: string[]
}
\`\`\`

### 6. Document Generation System
#### Diploma Maker
- **Custom Templates**: Multiple professional designs
- **Automated Generation**: Student data integration
- **Digital Signatures**: Instructor and director authentication
- **Print Optimization**: High-quality PDF output
- **WhatsApp Sharing**: Direct social media distribution

#### Receipt System
- **Professional Formatting**: MAXFRA branded receipts
- **Multiple Payment Methods**: Cash, card, transfer tracking
- **Tax Compliance**: Mexican tax regulation compliance
- **Automated Numbering**: Sequential receipt numbering
- **Digital Distribution**: Email and WhatsApp delivery

#### Form Builder
- **Enrollment Forms**: Student registration documents
- **Consent Forms**: Legal liability waivers
- **Feedback Forms**: Course evaluation surveys
- **Custom Forms**: Flexible form creation system

### 7. Settings & Configuration
#### System Customization
- **Color Themes**: Brand-consistent color schemes
- **Business Hours**: Operating schedule configuration
- **Notification Settings**: Communication preferences
- **Language Support**: Spanish and English interfaces
- **Currency Settings**: Mexican Peso (MXN) primary

#### Database Management
- **Automated Backups**: Daily data protection
- **Data Retention**: Configurable storage policies
- **Performance Monitoring**: System health tracking
- **Security Auditing**: Access log management

---

## 🏗 Architecture

### Application Structure
\`\`\`
maxfra-director-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── appointments/             # Appointment management
│   ├── calendar/                 # Calendar views
│   ├── documents/                # Document generation
│   ├── students/                 # Student management
│   ├── services/                 # Service catalog
│   ├── settings/                 # System configuration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Dashboard
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   └── bottom-navigation.tsx     # Navigation component
├── lib/                          # Utility libraries
│   ├── database.ts               # Database functions
│   ├── supabase.ts               # Supabase client
│   └── utils.ts                  # Helper functions
├── scripts/                      # Database scripts
│   ├── create-tables.sql         # Schema creation
│   └── seed-data.sql             # Sample data
└── public/                       # Static assets
\`\`\`

### Component Architecture
\`\`\`typescript
// Hierarchical component structure
App Layout
├── Header (Navigation)
├── Main Content
│   ├── Dashboard
│   ├── Calendar
│   ├── Students
│   ├── Documents
│   └── Settings
├── Bottom Navigation
└── Footer
\`\`\`

### Data Flow Architecture
\`\`\`
User Interface → React Components → Custom Hooks → Database Layer → Supabase
     ↑                                                                    ↓
Real-time Updates ← WebSocket Connection ← Supabase Realtime ← Database Changes
\`\`\`

---

## 🗄 Database Schema

### Core Tables

#### Students Table
\`\`\`sql
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  program_id UUID REFERENCES services(id),
  enrollment_date DATE NOT NULL,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  status VARCHAR(20) CHECK (status IN ('active', 'graduated', 'suspended')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### Appointments Table
\`\`\`sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  instructor_id UUID REFERENCES instructors(id),
  service_id UUID REFERENCES services(id),
  location_id UUID REFERENCES locations(id),
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### Services Table
\`\`\`sql
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration_hours DECIMAL(3,1) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(20) CHECK (category IN ('course', 'service', 'consultation')) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### Instructors Table
\`\`\`sql
CREATE TABLE instructors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialties TEXT[] NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### Locations Table
\`\`\`sql
CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  manager_id UUID REFERENCES instructors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### Receipts Table
\`\`\`sql
CREATE TABLE receipts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  receipt_number VARCHAR(20) NOT NULL UNIQUE,
  student_id UUID REFERENCES students(id),
  service_id UUID REFERENCES services(id),
  amount INTEGER NOT NULL,
  payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
  payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'card', 'transfer')) NOT NULL,
  issued_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

### Database Relationships
\`\`\`
Students (1) ←→ (N) Appointments (N) ←→ (1) Instructors
    ↓                    ↓                      ↓
Services (1) ←→ (N) Appointments (N) ←→ (1) Locations
    ↓
Receipts (N) ←→ (1) Students
\`\`\`

### Indexes for Performance
\`\`\`sql
-- Appointment queries
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_student ON appointments(student_id);
CREATE INDEX idx_appointments_instructor ON appointments(instructor_id);

-- Student queries
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_program ON students(program_id);

-- Receipt queries
CREATE INDEX idx_receipts_date ON receipts(issued_date);
CREATE INDEX idx_receipts_student ON receipts(student_id);
\`\`\`

---

## 🔌 API Endpoints

### Database Functions (lib/database.ts)

#### Dashboard Analytics
\`\`\`typescript
// Get dashboard statistics
export async function getDashboardStats(): Promise<DashboardStats>

// Get today's appointments
export async function getTodaysAppointments(): Promise<Appointment[]>
\`\`\`

#### Student Management
\`\`\`typescript
// Get all students with pagination
export async function getStudents(page?: number, limit?: number): Promise<Student[]>

// Add new student
export async function addStudent(studentData: CreateStudentData): Promise<Student>

// Update student progress
export async function updateStudentProgress(id: string, progress: number): Promise<void>

// Get students eligible for graduation
export async function getEligibleStudents(): Promise<Student[]>
\`\`\`

#### Appointment System
\`\`\`typescript
// Get appointments by date range
export async function getAppointments(days: number): Promise<Appointment[]>

// Create new appointment
export async function createAppointment(appointmentData: CreateAppointmentData): Promise<Appointment>

// Update appointment status
export async function updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void>

// Check instructor availability
export async function checkInstructorAvailability(instructorId: string, date: string, time: string): Promise<boolean>
\`\`\`

#### Service Management
\`\`\`typescript
// Get all services by category
export async function getServices(category?: ServiceCategory): Promise<Service[]>

// Get service pricing
export async function getServicePricing(serviceId: string): Promise<number>
\`\`\`

#### Location Management
\`\`\`typescript
// Get all locations with instructor details
export async function getLocations(): Promise<Location[]>

// Get location availability
export async function getLocationAvailability(locationId: string, date: string): Promise<TimeSlot[]>
\`\`\`

### Real-time Subscriptions
\`\`\`typescript
// Real-time appointment updates
const appointmentSubscription = supabase
  .channel('appointments')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'appointments' },
    (payload) => {
      // Handle real-time updates
    }
  )
  .subscribe()

// Real-time student progress updates
const studentSubscription = supabase
  .channel('students')
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'students' },
    (payload) => {
      // Handle progress updates
    }
  )
  .subscribe()
\`\`\`

---

## 🎨 User Interface

### Design System

#### Color Palette
\`\`\`css
:root {
  /* Primary Brand Colors */
  --maxfra-primary: 280 100% 70%;      /* Purple #8B5CF6 */
  --maxfra-secondary: 320 100% 75%;    /* Pink #EC4899 */
  --maxfra-accent: 200 100% 70%;       /* Cyan #06B6D4 */
  
  /* Status Colors */
  --maxfra-success: 142 76% 36%;       /* Green #10B981 */
  --maxfra-warning: 38 92% 50%;        /* Orange #F59E0B */
  --maxfra-error: 0 84% 60%;           /* Red #EF4444 */
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(280 100% 70%) 0%, hsl(320 100% 75%) 100%);
  --gradient-secondary: linear-gradient(135deg, hsl(200 100% 70%) 0%, hsl(240 100% 75%) 100%);
}
\`\`\`

#### Typography Scale
\`\`\`css
/* Font Sizes */
.text-xs { font-size: 0.75rem; }      /* 12px */
.text-sm { font-size: 0.875rem; }     /* 14px */
.text-base { font-size: 1rem; }       /* 16px */
.text-lg { font-size: 1.125rem; }     /* 18px */
.text-xl { font-size: 1.25rem; }      /* 20px */
.text-2xl { font-size: 1.5rem; }      /* 24px */
.text-3xl { font-size: 1.875rem; }    /* 30px */
\`\`\`

#### Component Library
- **Cards**: Glassmorphism effects with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Modern input styling with focus states
- **Navigation**: Bottom navigation for mobile optimization
- **Modals**: Overlay components with smooth transitions
- **Badges**: Status indicators with semantic colors

### Responsive Design
\`\`\`css
/* Mobile First Approach */
/* Base styles: Mobile (320px+) */
.container { padding: 1rem; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container { padding: 2rem; }
  .grid-cols-mobile { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container { padding: 3rem; }
  .grid-cols-desktop { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

### Animation System
\`\`\`css
/* Entrance Animations */
.fade-in { animation: fadeIn 0.5s ease-out; }
.slide-up { animation: slideUp 0.5s ease-out; }
.bounce-in { animation: bounceIn 0.6s ease-out; }

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
\`\`\`

### Accessibility Features
- **WCAG 2.1 AA Compliance**: Color contrast ratios
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy

---

## 🚀 Installation & Setup

### Prerequisites
\`\`\`bash
# Required software versions
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.30.0
\`\`\`

### Local Development Setup
\`\`\`bash
# 1. Clone the repository
git clone https://github.com/maxfra/director-app.git
cd director-app

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env.local

# 4. Configure environment variables
# Edit .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 5. Database setup
npm run db:setup

# 6. Start development server
npm run dev
\`\`\`

### Environment Variables
\`\`\`bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=GA_MEASUREMENT_ID

# Optional: Error Monitoring
SENTRY_DSN=your-sentry-dsn

# Optional: Email Service
RESEND_API_KEY=your-resend-api-key
\`\`\`

### Database Setup
\`\`\`bash
# Run database migrations
npm run db:migrate

# Seed with sample data
npm run db:seed

# Reset database (development only)
npm run db:reset
\`\`\`

---

## ⚙️ Configuration

### Next.js Configuration
\`\`\`javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig
\`\`\`

### Tailwind Configuration
\`\`\`javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'maxfra-primary': 'hsl(var(--maxfra-primary))',
        'maxfra-secondary': 'hsl(var(--maxfra-secondary))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
\`\`\`

### TypeScript Configuration
\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

---

## 🌐 Deployment

### Vercel Deployment (Recommended)
\`\`\`bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod

# 4. Configure environment variables in Vercel dashboard
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
\`\`\`

### Manual Deployment
\`\`\`bash
# 1. Build the application
npm run build

# 2. Start production server
npm start

# 3. Or export static files
npm run export
\`\`\`

### Docker Deployment
\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

### CI/CD Pipeline
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

---

## 🔒 Security

### Authentication & Authorization
\`\`\`typescript
// Row Level Security (RLS) Policies
-- Students can only view their own records
CREATE POLICY "Students can view own records" ON students
  FOR SELECT USING (auth.uid() = user_id);

-- Only directors can modify student records
CREATE POLICY "Directors can modify students" ON students
  FOR ALL USING (auth.jwt() ->> 'role' = 'director');

-- Instructors can view their assigned students
CREATE POLICY "Instructors view assigned students" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM appointments 
      WHERE student_id = students.id 
      AND instructor_id = auth.uid()
    )
  );
\`\`\`

### Data Validation
\`\`\`typescript
// Input validation schemas
import { z } from 'zod'

const StudentSchema = z.object({
  full_name: z.string().min(2).max(255),
  phone: z.string().regex(/^\+52\s\d{2}\s\d{4}\s\d{4}$/),
  email: z.string().email().optional(),
  program_id: z.string().uuid(),
})

const AppointmentSchema = z.object({
  student_id: z.string().uuid(),
  instructor_id: z.string().uuid(),
  service_id: z.string().uuid(),
  location_id: z.string().uuid(),
  appointment_date: z.string().date(),
  start_time: z.string().time(),
  end_time: z.string().time(),
})
\`\`\`

### Security Headers
\`\`\`javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
\`\`\`

### Environment Security
\`\`\`bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://secure-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=limited-permissions-key
SUPABASE_SERVICE_ROLE_KEY=admin-key-secure-storage

# Security best practices
- Use environment-specific keys
- Rotate keys regularly
- Implement rate limiting
- Enable audit logging
- Use HTTPS everywhere
\`\`\`

---

## ⚡ Performance

### Core Web Vitals Optimization
\`\`\`typescript
// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
\`\`\`

### Image Optimization
\`\`\`typescript
// Next.js Image component usage
import Image from 'next/image'

<Image
  src="/maxfra-logo.png"
  alt="MAXFRA Academy Logo"
  width={200}
  height={100}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
\`\`\`

### Database Performance
\`\`\`sql
-- Query optimization
EXPLAIN ANALYZE SELECT 
  s.full_name,
  s.progress_percentage,
  srv.name as service_name
FROM students s
JOIN services srv ON s.program_id = srv.id
WHERE s.status = 'active'
ORDER BY s.enrollment_date DESC
LIMIT 50;

-- Index usage
CREATE INDEX CONCURRENTLY idx_students_status_enrollment 
ON students(status, enrollment_date DESC);
\`\`\`

### Caching Strategy
\`\`\`typescript
// API route caching
export async function GET() {
  const data = await getDashboardStats()
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
    }
  })
}

// Client-side caching
const { data, error } = useSWR('/api/dashboard', fetcher, {
  refreshInterval: 30000, // 30 seconds
  revalidateOnFocus: false,
})
\`\`\`

### Bundle Optimization
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
\`\`\`

---

## 🧪 Testing

### Testing Strategy
\`\`\`typescript
// Unit tests with Jest and React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'
import { StudentCard } from '@/components/student-card'

describe('StudentCard', () => {
  const mockStudent = {
    id: '1',
    full_name: 'Test Student',
    progress_percentage: 75,
    status: 'active' as const,
  }

  it('renders student information correctly', () => {
    render(<StudentCard student={mockStudent} />)
    
    expect(screen.getByText('Test Student')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('handles progress bar correctly', () => {
    render(<StudentCard student={mockStudent} />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
  })
})
\`\`\`

### Integration Tests
\`\`\`typescript
// API route testing
import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/students'

describe('/api/students', () => {
  it('returns students list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(Array.isArray(data)).toBe(true)
  })
})
\`\`\`

### E2E Testing with Playwright
\`\`\`typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('dashboard loads correctly', async ({ page }) => {
  await page.goto('/')
  
  // Check if dashboard elements are present
  await expect(page.locator('h1')).toContainText('MAXFRA')
  await expect(page.locator('[data-testid="total-students"]')).toBeVisible()
  await expect(page.locator('[data-testid="todays-classes"]')).toBeVisible()
})

test('student creation flow', async ({ page }) => {
  await page.goto('/students/new')
  
  await page.fill('[data-testid="student-name"]', 'Test Student')
  await page.fill('[data-testid="student-phone"]', '+52 55 1234 5678')
  await page.selectOption('[data-testid="program-select"]', 'microblading')
  
  await page.click('[data-testid="submit-button"]')
  
  await expect(page.locator('.success-message')).toBeVisible()
})
\`\`\`

### Test Configuration
\`\`\`javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
\`\`\`

---

## 🔧 Maintenance

### Regular Maintenance Tasks

#### Daily
- Monitor application performance
- Check error logs and alerts
- Verify backup completion
- Review user activity logs

#### Weekly
- Update dependencies
- Run security scans
- Performance optimization review
- Database maintenance

#### Monthly
- Full system backup verification
- Security audit
- Performance benchmarking
- User feedback analysis

### Monitoring & Logging
\`\`\`typescript
// Error monitoring with Sentry
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})

// Custom error boundary
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback}>
      {children}
    </Sentry.ErrorBoundary>
  )
}
\`\`\`

### Database Maintenance
\`\`\`sql
-- Regular maintenance queries
-- Analyze table statistics
ANALYZE students, appointments, services, instructors, locations, receipts;

-- Vacuum tables to reclaim space
VACUUM ANALYZE students;
VACUUM ANALYZE appointments;

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Monitor slow queries
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
\`\`\`

### Backup Strategy
\`\`\`bash
#!/bin/bash
# backup.sh - Automated backup script

# Database backup
pg_dump $DATABASE_URL > "backup_$(date +%Y%m%d_%H%M%S).sql"

# File backup
tar -czf "files_$(date +%Y%m%d_%H%M%S).tar.gz" public/uploads/

# Upload to cloud storage
aws s3 cp backup_*.sql s3://maxfra-backups/database/
aws s3 cp files_*.tar.gz s3://maxfra-backups/files/

# Cleanup old backups (keep 30 days)
find . -name "backup_*.sql" -mtime +30 -delete
find . -name "files_*.tar.gz" -mtime +30 -delete
\`\`\`

---

## 🚨 Troubleshooting

### Common Issues & Solutions

#### Database Connection Issues
\`\`\`typescript
// Problem: Supabase connection timeout
// Solution: Implement connection retry logic
const supabaseWithRetry = async (operation: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
\`\`\`

#### Performance Issues
\`\`\`typescript
// Problem: Slow page loads
// Solution: Implement loading states and pagination
const [loading, setLoading] = useState(true)
const [students, setStudents] = useState<Student[]>([])
const [page, setPage] = useState(1)

useEffect(() => {
  const loadStudents = async () => {
    setLoading(true)
    try {
      const data = await getStudents(page, 20) // Paginate
      setStudents(data)
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setLoading(false)
    }
  }
  
  loadStudents()
}, [page])
\`\`\`

#### Memory Leaks
\`\`\`typescript
// Problem: Component memory leaks
// Solution: Proper cleanup in useEffect
useEffect(() => {
  const subscription = supabase
    .channel('appointments')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, 
      (payload) => {
        // Handle updates
      }
    )
    .subscribe()

  // Cleanup subscription
  return () => {
    subscription.unsubscribe()
  }
}, [])
\`\`\`

### Error Handling
\`\`\`typescript
// Global error handler
export function GlobalErrorHandler({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error:', error)
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
\`\`\`

### Debug Mode
\`\`\`typescript
// Development debugging
if (process.env.NODE_ENV === 'development') {
  // Enable React DevTools
  if (typeof window !== 'undefined') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {}
  }
  
  // Database query logging
  console.log('Database query:', query)
  console.log('Query result:', result)
}
\`\`\`

---

## 📞 Support & Contact

### Technical Support
- **Email**: tech-support@maxfra.mx
- **Phone**: +52 55 1234 5678
- **Hours**: Monday - Friday, 9:00 AM - 6:00 PM (Mexico City Time)

### Documentation Updates
This documentation is maintained by the MAXFRA development team and is updated with each major release.

**Last Updated**: January 25, 2025
**Version**: 1.0.0
**Next Review**: February 25, 2025

---

## 📄 License

Copyright © 2025 MAXFRA Beauty Academy. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

*This documentation provides a comprehensive overview of the MAXFRA Director App. For specific implementation details or additional support, please contact the development team.*
