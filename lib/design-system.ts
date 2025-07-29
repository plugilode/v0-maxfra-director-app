export const designSystem = {
  colors: {
    primary: {
      50: 'bg-purple-50',
      100: 'bg-purple-100',
      500: 'bg-purple-500',
      600: 'bg-purple-600',
      700: 'bg-purple-700',
      text: 'text-purple-600',
      textDark: 'text-purple-700',
      border: 'border-purple-200',
    },
    secondary: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
      text: 'text-blue-600',
      textDark: 'text-blue-700',
      border: 'border-blue-200',
    },
    accent: {
      green: {
        500: 'bg-green-500',
        600: 'bg-green-600',
        700: 'bg-green-700',
        text: 'text-green-600',
        light: 'bg-green-100 text-green-800',
      },
      orange: {
        500: 'bg-orange-500',
        600: 'bg-orange-600',
        700: 'bg-orange-700',
        text: 'text-orange-600',
      },
      pink: {
        500: 'bg-pink-500',
        600: 'bg-pink-600',
        700: 'bg-pink-700',
        text: 'text-pink-600',
      },
      red: {
        500: 'bg-red-500',
        text: 'text-red-600',
        light: 'bg-red-100 text-red-800',
      },
      yellow: {
        light: 'bg-yellow-100 text-yellow-800',
      }
    },
    neutral: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      200: 'bg-gray-200',
      400: 'text-gray-400',
      500: 'text-gray-500',
      600: 'text-gray-600',
      900: 'text-gray-900',
      white: 'bg-white',
      border: 'border-gray-200',
    }
  },
  
  gradients: {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600',
    primaryHover: 'bg-gradient-to-r from-purple-700 to-blue-700',
    light: 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50',
  },

  components: {
    header: {
      base: 'bg-white border-b border-gray-200 px-4 py-3',
      gradient: 'bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3',
    },
    
    card: {
      base: 'rounded-lg bg-white shadow-sm border-0',
      elevated: 'rounded-lg bg-white shadow-lg border-0',
      primary: 'rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200',
    },
    
    button: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      secondary: 'bg-blue-600 hover:bg-blue-700 text-white',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      warning: 'bg-orange-500 hover:bg-orange-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
      gradient: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
    },
    
    avatar: {
      primary: 'bg-purple-600 text-white',
      secondary: 'bg-blue-600 text-white',
    },
    
    badge: {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      graduated: 'bg-purple-100 text-purple-800',
      suspended: 'bg-gray-100 text-gray-800',
    },
    
    stats: [
      {
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      },
      {
        color: 'text-green-600', 
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      },
      {
        color: 'text-purple-600',
        bgColor: 'bg-purple-50', 
        borderColor: 'border-purple-200',
      },
      {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
      }
    ]
  },

  layout: {
    page: 'min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-20',
    container: 'p-4 space-y-6',
    section: 'space-y-4',
  },

  icons: {
    sizes: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5', 
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
      xxl: 'h-12 w-12',
    }
  }
}

export const getStatusBadgeStyle = (status: string) => {
  const styles = {
    confirmed: designSystem.components.badge.confirmed,
    pending: designSystem.components.badge.pending,
    cancelled: designSystem.components.badge.cancelled,
    active: designSystem.components.badge.active,
    graduated: designSystem.components.badge.graduated,
    suspended: designSystem.components.badge.suspended,
    completed: designSystem.components.badge.confirmed,
  }
  return styles[status as keyof typeof styles] || designSystem.components.badge.pending
}

export const getStatCardStyle = (index: number) => {
  return designSystem.components.stats[index % designSystem.components.stats.length]
}