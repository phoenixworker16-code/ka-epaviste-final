import { NextRequest, NextResponse } from 'next/server'
import { createRemovalRequest } from '@/lib/services/removal-requests'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const requiredFields = [
      'first_name', 'last_name', 'email', 'phone',
      'vehicle_brand', 'vehicle_model', 'vehicle_condition',
      'address', 'city', 'postal_code'
    ]
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
    }
    
    const result = await createRemovalRequest(data)
    
    return NextResponse.json({ 
      success: true, 
      request: result 
    })
  } catch (error) {
    console.error('Error creating removal request:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}