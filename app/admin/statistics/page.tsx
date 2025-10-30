"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, TrendingUp, MapPin, Calendar, BarChart3, PieChart, RefreshCw, Download } from "lucide-react"

interface StatisticsData {
  totalRequests: number
  requestsByStatus: Record<string, number>
  requestsByCity: Record<string, number>
  requestsByBrand: Record<string, number>
  recentRequests: number
  thisMonthRequests: number
  monthlyGrowth: number
}

export default function AdminStatisticsPage() {
  const [admin, setAdmin] = useState<any>(null)
  const [stats, setStats] = useState<StatisticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        if (!token) {
          window.location.href = '/admin/login'
          return
        }

        const [adminRes, statsRes] = await Promise.all([
          fetch('/api/admin/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('/api/admin/statistics', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        if (adminRes.ok && statsRes.ok) {
          const adminData = await adminRes.json()
          const statsData = await statsRes.json()
          setAdmin(adminData)
          setStats(statsData)
        } else {
          window.location.href = '/admin/login'
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        window.location.href = '/admin/login'
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading || !admin || !stats) {
    return <div className="min-h-screen bg-muted/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Chargement des statistiques...</p>
      </div>
    </div>
  }

  const topCities = Object.entries(stats.requestsByCity)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)

  const topBrands = Object.entries(stats.requestsByBrand)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)

  const statusLabels = {
    pending: "En attente",
    confirmed: "Confirmé",
    in_progress: "En cours",
    completed: "Terminé",
    cancelled: "Annulé",
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader user={admin} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-primary">Statistiques</h1>
                <p className="text-muted-foreground">Analyse des données et tendances</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() => window.open('/api/admin/export-pdf', '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total demandes</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests || 0}</div>
              <p className="text-xs text-muted-foreground">Depuis le début</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisMonthRequests || 0}</div>
              <p className="text-xs text-muted-foreground">
                {monthlyGrowth > 0 ? "+" : ""}
                {monthlyGrowth}% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">30 derniers jours</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentRequests || 0}</div>
              <p className="text-xs text-muted-foreground">Activité récente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRequests
                  ? Math.round(((requestsByStatus?.completed || 0) / totalRequests) * 100)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">Demandes terminées</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Répartition par statut</span>
              </CardTitle>
              <CardDescription>Distribution des demandes par statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(requestsByStatus || {}).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          status === "pending"
                            ? "bg-orange-500"
                            : status === "completed"
                              ? "bg-green-500"
                              : status === "cancelled"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <span className="text-sm">{statusLabels[status as keyof typeof statusLabels] || status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{count as number}</span>
                      <span className="text-xs text-muted-foreground">
                        ({totalRequests ? Math.round(((count as number) / totalRequests) * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Cities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Villes principales</span>
              </CardTitle>
              <CardDescription>Top 5 des villes avec le plus de demandes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCities.map(([city, count], index) => (
                  <div key={city} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="text-sm">{city}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{count as number}</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${totalRequests ? ((count as number) / totalRequests) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Vehicle Brands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>Marques de véhicules</span>
            </CardTitle>
            <CardDescription>Top 5 des marques les plus enlevées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {topBrands.map(([brand, count], index) => (
                <div key={brand} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">{count as number}</div>
                  <div className="text-sm font-medium mb-1">{brand}</div>
                  <div className="text-xs text-muted-foreground">
                    {totalRequests ? Math.round(((count as number) / totalRequests) * 100) : 0}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
