"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Car, Phone, Mail, MapPin, Calendar, Eye, Search, RefreshCw } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"

interface RemovalRequest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  vehicle_brand: string
  vehicle_model: string
  vehicle_year: number | null
  license_plate: string
  vehicle_condition: string
  address: string
  city: string
  postal_code: string
  additional_info: string
  photo_urls: string[]
  status: string
  created_at: string
}

export default function AdminPage() {
  const [requests, setRequests] = useState<RemovalRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<RemovalRequest | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/admin/requests')
      if (!response.ok) {
        throw new Error('Failed to fetch requests')
      }
      const data = await response.json()
      setRequests(data.requests || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Update local state
      setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)))
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.vehicle_brand.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "confirmed":
        return "Confirmé"
      case "completed":
        return "Terminé"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Chargement des demandes...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Administration</h1>
              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Gestion des demandes d'enlèvement d'épaves automobiles
              </p>
            </div>
          </div>
        </section>

        {/* Admin Dashboard */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">En attente</p>
                        <p className="text-2xl font-bold">{requests.filter((r) => r.status === "pending").length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Confirmées</p>
                        <p className="text-2xl font-bold">{requests.filter((r) => r.status === "confirmed").length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Car className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Terminées</p>
                        <p className="text-2xl font-bold">{requests.filter((r) => r.status === "completed").length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">{requests.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search">Rechercher</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Nom, email, ville, marque..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="status">Statut</Label>
                      <select
                        id="status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="all">Tous</option>
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="completed">Terminé</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={fetchRequests} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualiser
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {request.first_name} {request.last_name}
                            </h3>
                            <Badge className={getStatusColor(request.status)}>{getStatusLabel(request.status)}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {request.vehicle_brand} {request.vehicle_model} {request.vehicle_year}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{request.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{request.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {request.city} ({request.postal_code})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(request.created_at).toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </Button>

                          {request.status === "pending" && (
                            <Button size="sm" onClick={() => updateRequestStatus(request.id, "confirmed")}>
                              Confirmer
                            </Button>
                          )}

                          {request.status === "confirmed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, "completed")}
                            >
                              Marquer terminé
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredRequests.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Aucune demande trouvée</h3>
                      <p className="text-muted-foreground">
                        {searchTerm || statusFilter !== "all"
                          ? "Essayez de modifier vos critères de recherche"
                          : "Aucune demande d'enlèvement pour le moment"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Détails de la demande</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Client</Label>
                    <p className="font-medium">
                      {selectedRequest.first_name} {selectedRequest.last_name}
                    </p>
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {getStatusLabel(selectedRequest.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <p>{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p>{selectedRequest.email}</p>
                  </div>
                  <div>
                    <Label>Véhicule</Label>
                    <p>
                      {selectedRequest.vehicle_brand} {selectedRequest.vehicle_model} {selectedRequest.vehicle_year}
                    </p>
                  </div>
                  <div>
                    <Label>État</Label>
                    <p>{selectedRequest.vehicle_condition}</p>
                  </div>
                  <div>
                    <Label>Plaque</Label>
                    <p>{selectedRequest.license_plate || "Non renseignée"}</p>
                  </div>
                  <div>
                    <Label>Date de demande</Label>
                    <p>{new Date(selectedRequest.created_at).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>

                <div>
                  <Label>Adresse complète</Label>
                  <p>
                    {selectedRequest.address}, {selectedRequest.city} {selectedRequest.postal_code}
                  </p>
                </div>

                {selectedRequest.additional_info && (
                  <div>
                    <Label>Informations complémentaires</Label>
                    <p className="text-sm bg-muted p-3 rounded">{selectedRequest.additional_info}</p>
                  </div>
                )}

                {selectedRequest.photo_urls && selectedRequest.photo_urls.length > 0 && (
                  <div>
                    <Label>Photos du véhicule</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {selectedRequest.photo_urls.map((url, index) => (
                        <img
                          key={index}
                          src={url || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  {selectedRequest.status === "pending" && (
                    <Button
                      onClick={() => {
                        updateRequestStatus(selectedRequest.id, "confirmed")
                        setSelectedRequest(null)
                      }}
                    >
                      Confirmer la demande
                    </Button>
                  )}
                  {selectedRequest.status === "confirmed" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateRequestStatus(selectedRequest.id, "completed")
                        setSelectedRequest(null)
                      }}
                    >
                      Marquer comme terminé
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                    Fermer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <ScrollToTop />
      </main>

      <Footer />
    </div>
  )
}
