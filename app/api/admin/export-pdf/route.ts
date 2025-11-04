import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { requireAdmin } from '@/lib/admin-auth'
// import puppeteer from 'puppeteer'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export async function GET() {
  try {
    await requireAdmin()
    
    const [requestsRes, messagesRes] = await Promise.all([
      pool.query('SELECT * FROM removal_requests ORDER BY created_at DESC'),
      pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC')
    ])
    
    const requests = requestsRes.rows
    const messages = messagesRes.rows
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Rapport KA Auto Épaves</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #FF6600; padding-bottom: 20px; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat-card { text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .stat-number { font-size: 24px; font-weight: bold; color: #FF6600; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #FF6600; color: white; }
        .status-pending { color: #FF6600; font-weight: bold; }
        .status-completed { color: #22c55e; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚗 KA Auto Épaves - Rapport d'activité</h1>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">${requests.length}</div>
          <div>Total demandes</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${requests.filter(r => r.status === 'pending').length}</div>
          <div>En attente</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${requests.filter(r => r.status === 'completed').length}</div>
          <div>Terminées</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${messages.length}</div>
          <div>Messages</div>
        </div>
      </div>
      
      <h2>Demandes d'enlèvement</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Véhicule</th>
            <th>Ville</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          ${requests.slice(0, 20).map(r => `
            <tr>
              <td>${new Date(r.created_at).toLocaleDateString('fr-FR')}</td>
              <td>${r.first_name} ${r.last_name}</td>
              <td>${r.vehicle_brand} ${r.vehicle_model}</td>
              <td>${r.city}</td>
              <td class="status-${r.status}">${r.status === 'pending' ? 'En attente' : r.status === 'completed' ? 'Terminé' : 'En cours'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="text-align: center; margin-top: 30px; color: #666;">
        <p>KA Auto Épaves - le Loir-et-Cher</p>
      </div>
    </body>
    </html>
    `
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="rapport-ka-auto-epaves.html"'
      }
    })
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}