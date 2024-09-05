import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const formatBirthdate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1')
}

export const formatDate = (value: string) => {
  const date = new Date(value)

  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const formattedDate = date.toLocaleDateString('en-US', options)

  const [datePart, timePart] = formattedDate.split(', ')

  return `${datePart} at ${timePart}h`
}

export function getInitials(fullName: string) {
  const nameParts = fullName.trim().split(' ')

  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}
