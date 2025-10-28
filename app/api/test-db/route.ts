import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const count = await prisma.removalRequest.count()
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected',
      requestCount: count
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error)
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    const result = await prisma.removalRequest.create({
      data: {
        firstName: 'Test',
        lastName: 'User', 
        email: 'test@example.com',
        phone: '0123456789',
        vehicleBrand: 'Test',
        vehicleModel: 'Model',
        vehicleCondition: 'autre',
        address: 'Test Address',
        city: 'Test City',
        postalCode: '12345'
      }
    })
    
    return NextResponse.json({ 
      success: true,
      id: result.id
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error)
    }, { status: 500 })
  }
}