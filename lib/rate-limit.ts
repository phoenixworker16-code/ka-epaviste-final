// Rate limiting simple pour protéger les endpoints sensibles
import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(
  request: NextRequest,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; remaining: number } {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const key = `${ip}-${request.nextUrl.pathname}`
  const now = Date.now()

  // Nettoyer les anciennes entrées
  if (store[key] && store[key].resetTime < now) {
    delete store[key]
  }

  // Initialiser ou incrémenter
  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    }
    return { success: true, remaining: limit - 1 }
  }

  store[key].count++

  if (store[key].count > limit) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining: limit - store[key].count }
}
