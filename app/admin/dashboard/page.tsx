"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Car, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  MessageCircle,
  Bell,
  Users,
  Calendar,
  Download,
  RefreshCw,
  Settings,
  LogOut
} from "lucide-react"
import { useRouter } from "next/navigation"
import jsPDF from 'jspdf'

interface DashboardStats {
  totalRequests: number
  pendingRequests: number
  completedRequests: number
  totalMessages: number
  recentRequests: any[]
  recentMessages: any[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalMessages: 0,
    recentRequests: [],
    recentMessages: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [requestsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/requests'),
        fetch('/api/admin/messages')
      ])
      
      if (requestsRes.ok && messagesRes.ok) {
        const requestsData = await requestsRes.json()
        const messagesData = await messagesRes.json()
        
        const requests = requestsData.requests || []
        const messages = messagesData.messages || []
        
        setStats({
          totalRequests: requests.length,
          pendingRequests: requests.filter((r: any) => r.status === 'pending').length,
          completedRequests: requests.filter((r: any) => r.status === 'completed').length,
          totalMessages: messages.length,
          recentRequests: requests.slice(0, 5),
          recentMessages: messages.slice(0, 3)
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
    setIsLoading(false)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push("/admin/login")
  }

  const exportToPDF = () => {
    const pdf = new jsPDF()
    
    // Header avec fond orange
    pdf.setFillColor(255, 102, 0)
    pdf.rect(0, 0, 210, 40, 'F')
    
    // Logo (simulé avec un carré orange foncé)
    pdf.setFillColor(204, 82, 0)
    pdf.rect(15, 10, 20, 20, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(14)
    pdf.text('KA', 22, 23)
    
    // Nom entreprise centré
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(22)
    pdf.text('KA AUTO ÉPAVES', 105, 20, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text('Service d\'enlèvement d\'épaves - le Loir-et-Cher', 105, 30, { align: 'center' })
    
    // Ligne de séparation
    pdf.setDrawColor(255, 102, 0)
    pdf.setLineWidth(2)
    pdf.line(20, 50, 190, 50)
    
    // Titre du rapport
    pdf.setTextColor(255, 102, 0)
    pdf.setFontSize(18)
    pdf.text('RAPPORT D\'ACTIVITÉ', 105, 65, { align: 'center' })
    
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(10)
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 75, { align: 'center' })
    
    // Statistiques avec encadrés
    let yPos = 90
    pdf.setFillColor(255, 102, 0)
    pdf.rect(20, yPos, 170, 8, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(14)
    pdf.text('STATISTIQUES PRINCIPALES', 105, yPos + 6, { align: 'center' })
    
    yPos += 20
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(12)
    
    // Encadrés pour les stats
    const statsData = [
      [`Total demandes: ${stats.totalRequests}`, `En attente: ${stats.pendingRequests}`],
      [`Terminées: ${stats.completedRequests}`, `Messages: ${stats.totalMessages}`]
    ]
    
    statsData.forEach(([left, right]) => {
      pdf.setDrawColor(255, 102, 0)
      pdf.rect(20, yPos, 80, 15)
      pdf.rect(110, yPos, 80, 15)
      pdf.text(left, 25, yPos + 10)
      pdf.text(right, 115, yPos + 10)
      yPos += 20
    })
    
    // Demandes récentes
    yPos += 10
    pdf.setFillColor(255, 102, 0)
    pdf.rect(20, yPos, 170, 8, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(14)
    pdf.text('DERNIÈRES DEMANDES', 105, yPos + 6, { align: 'center' })
    
    yPos += 20
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(10)
    stats.recentRequests.slice(0, 5).forEach((request) => {
      pdf.setDrawColor(255, 102, 0)
      pdf.rect(20, yPos, 170, 12)
      pdf.text(`${request.first_name} ${request.last_name} - ${request.vehicle_brand} ${request.vehicle_model}`, 25, yPos + 8)
      yPos += 15
    })
    
    // Footer
    pdf.setFillColor(255, 102, 0)
    pdf.rect(0, 270, 210, 27, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.text('KA AUTO ÉPAVES', 105, 280, { align: 'center' })
    pdf.setFontSize(10)
    pdf.text('📞 +33 6 63 83 03 03  |  📧 contact@ka-autoepaves.fr', 105, 287, { align: 'center' })
    pdf.text('📍 le Loir-et-Cher, France', 105, 294, { align: 'center' })
    
    pdf.save('rapport-ka-auto-epaves.pdf')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p>Chargement du tableau de bord...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-primary">Tableau de bord</h1>
                <p className="text-muted-foreground">Vue d'ensemble de l'activité KA Auto Épaves</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchDashboardData}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={exportToPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="text-sm font-medium">Total demandes</CardTitle>
              <div className="bg-primary p-2 rounded-lg">
                <Car className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-primary">{stats.totalRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">Toutes les demandes</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-orange-50 to-orange-100">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <div className="bg-orange-500 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-orange-600">{stats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">À traiter</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
              <div className="bg-green-500 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-green-600">{stats.completedRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">Enlèvements effectués</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <div className="bg-blue-500 p-2 rounded-lg">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-blue-600">{stats.totalMessages}</div>
              <p className="text-xs text-muted-foreground mt-1">Messages reçus</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Requests */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span>Demandes récentes</span>
              </CardTitle>
              <CardDescription>Les dernières demandes d'enlèvement</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {stats.recentRequests.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-primary/5 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">
                          {request.first_name} {request.last_name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {request.vehicle_brand} {request.vehicle_model} - {request.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={request.status === 'pending' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {request.status === 'pending' ? 'En attente' : 
                           request.status === 'completed' ? 'Terminé' : 'En cours'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(request.created_at).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune demande</p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/requests">
                    Voir toutes les demandes
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span>Messages récents</span>
              </CardTitle>
              <CardDescription>Les derniers messages de contact</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {stats.recentMessages.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentMessages.map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">
                          {message.first_name} {message.last_name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {message.subject}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={message.status === 'new' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {message.status === 'new' ? 'Nouveau' : 
                           message.status === 'replied' ? 'Répondu' : 'Lu'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.created_at).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun message</p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/messages">
                    Voir tous les messages
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span>Actions rapides</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <a href="/admin/requests">
                  <Car className="mr-2 h-4 w-4" />
                  Gérer les demandes
                </a>
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
                <a href="/admin/messages">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Gérer les messages
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
