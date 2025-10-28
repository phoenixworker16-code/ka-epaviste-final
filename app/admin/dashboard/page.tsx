import { requireAdmin } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pool } from 'pg'
import { Car, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export default async function AdminDashboardPage() {
  const admin = await requireAdmin()

  // Get statistics
  const totalRequestsResult = await pool.query('SELECT COUNT(*) FROM removal_requests')
  const totalRequests = parseInt(totalRequestsResult.rows[0].count)

  const pendingRequestsResult = await pool.query('SELECT COUNT(*) FROM removal_requests WHERE status = $1', ['pending'])
  const pendingRequests = parseInt(pendingRequestsResult.rows[0].count)

  const completedRequestsResult = await pool.query('SELECT COUNT(*) FROM removal_requests WHERE status = $1', ['completed'])
  const completedRequests = parseInt(completedRequestsResult.rows[0].count)

  const recentRequestsResult = await pool.query(
    'SELECT * FROM removal_requests ORDER BY created_at DESC LIMIT 5'
  )
  const recentRequests = recentRequestsResult.rows

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader user={admin} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de l'activité KA Auto Épaves</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total demandes</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests || 0}</div>
              <p className="text-xs text-muted-foreground">Toutes les demandes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingRequests || 0}</div>
              <p className="text-xs text-muted-foreground">À traiter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedRequests || 0}</div>
              <p className="text-xs text-muted-foreground">Enlèvements effectués</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalRequests ? Math.round(((completedRequests || 0) / totalRequests) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Demandes traitées</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Demandes récentes</span>
            </CardTitle>
            <CardDescription>Les 5 dernières demandes d'enlèvement</CardDescription>
          </CardHeader>
          <CardContent>
            {recentRequests && recentRequests.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">
                            {request.first_name} {request.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {request.vehicle_brand} {request.vehicle_model} - {request.city}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "pending"
                            ? "bg-orange-100 text-orange-800"
                            : request.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {request.status === "pending"
                          ? "En attente"
                          : request.status === "completed"
                            ? "Terminé"
                            : "En cours"}
                      </div>
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
                <p className="text-muted-foreground">Aucune demande pour le moment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
