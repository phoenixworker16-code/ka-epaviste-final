import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data.first_name || !data.last_name || !data.email || !data.phone) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }
    
    const result = await prisma.removalRequest.create({
      data: {
        firstName: String(data.first_name),
        lastName: String(data.last_name),
        email: String(data.email),
        phone: String(data.phone),
        vehicleBrand: String(data.vehicle_brand || ''),
        vehicleModel: String(data.vehicle_model || ''),
        vehicleYear: data.vehicle_year ? Number(data.vehicle_year) : null,
        licensePlate: data.license_plate || null,
        vehicleCondition: String(data.vehicle_condition || 'autre'),
        address: String(data.address || ''),
        city: String(data.city || ''),
        postalCode: String(data.postal_code || ''),
        additionalInfo: data.additional_info || null,
        photoUrls: Array.isArray(data.photo_urls) ? data.photo_urls : [],
      }
    })
    
    return NextResponse.json({ success: true, id: result.id })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}