import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatIndianCurrency = (amount: number) => {
  // Handle invalid values
  if (isNaN(amount) || amount === undefined || amount === null) {
    return '0'
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal', // Changed from 'currency' to avoid showing ₹ symbol (we add it separately)
    maximumFractionDigits: 0
  }).format(amount)
}
