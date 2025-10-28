"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ImageIcon,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react"

interface RemovalRequest {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  vehicle_brand: string
  vehicle_model: string
  vehicle_year: number | null
  license_plate: string | null
  vehicle_condition: string
  address: string
  city: string
  postal_code: string
  additional_info: string | null
  photo_urls: string[] | null
  status: string
  admin_notes: string | null
  estimated_pickup_date: string | null
  actual_pickup_date: string | null
}

interface AdminUser {
  email: string
  first_name?: string
  last_name?: string
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<RemovalRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<RemovalRequest[]>([])
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<RemovalRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, statusFilter])



  const fetchRequests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/requests')
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error("Error fetching requests:", error)
    }
    setIsLoading(false)
  }

  const filterRequests = () => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.vehicle_brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.vehicle_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    setFilteredRequests(filtered)
  }

  const updateRequestStatus = async (requestId: string, status: string, adminNotes?: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: requestId, status, admin_notes: adminNotes })
      })
      
      if (response.ok) {
        await fetchRequests()
        if (selectedRequest?.id === requestId) {
          setSelectedRequest({ ...selectedRequest, status, admin_notes: adminNotes || selectedRequest.admin_notes })
        }
      }
    } catch (error) {
      console.error("Error updating request:", error)
    }
    setIsUpdating(false)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", variant: "secondary" as const, icon: Clock },
      confirmed: { label: "Confirmé", variant: "default" as const, icon: CheckCircle },
      in_progress: { label: "En cours", variant: "default" as const, icon: AlertTriangle },
      completed: { label: "Terminé", variant: "default" as const, icon: CheckCircle },
      cancelled: { label: "Annulé", variant: "destructive" as const, icon: AlertTriangle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  const getConditionLabel = (condition: string) => {
    const conditions = {
      accidente: "Accidenté",
      en_panne: "En panne",
      hors_service: "Hors service",
      autre: "Autre",
    }
    return conditions[condition as keyof typeof conditions] || condition
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <AdminHeader user={adminUser || undefined} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Chargement des demandes...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader user={adminUser || undefined} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestion des demandes</h1>
          <p className="text-muted-foreground">Gérez toutes les demandes d'enlèvement d'épaves</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Nom, email, véhicule, ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Statut</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes ({filteredRequests.length})</CardTitle>
            <CardDescription>Liste de toutes les demandes d'enlèvement</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredRequests.length > 0 ? (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold">
                            {request.first_name} {request.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {request.vehicle_brand} {request.vehicle_model}
                            {request.vehicle_year && ` (${request.vehicle_year})`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                              className="flex items-center space-x-1"
                            >
                              <Eye className="h-4 w-4" />
                              <span>Voir</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Demande de {selectedRequest?.first_name} {selectedRequest?.last_name}
                              </DialogTitle>
                              <DialogDescription>
                                Créée le{" "}
                                {selectedRequest && new Date(selectedRequest.created_at).toLocaleDateString("fr-FR")}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedRequest && (
                              <Tabs defaultValue="details" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="details">Détails</TabsTrigger>
                                  <TabsTrigger value="photos">Photos</TabsTrigger>
                                  <TabsTrigger value="admin">Administration</TabsTrigger>
                                </TabsList>

                                <TabsContent value="details" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                          <FileText className="h-5 w-5" />
                                          <span>Contact</span>
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <Mail className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedRequest.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedRequest.phone}</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                          <div>
                                            <p>{selectedRequest.address}</p>
                                            <p>
                                              {selectedRequest.postal_code} {selectedRequest.city}
                                            </p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                          <Car className="h-5 w-5" />
                                          <span>Véhicule</span>
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <p>
                                          <strong>Marque/Modèle:</strong> {selectedRequest.vehicle_brand}{" "}
                                          {selectedRequest.vehicle_model}
                                        </p>
                                        {selectedRequest.vehicle_year && (
                                          <p>
                                            <strong>Année:</strong> {selectedRequest.vehicle_year}
                                          </p>
                                        )}
                                        {selectedRequest.license_plate && (
                                          <p>
                                            <strong>Immatriculation:</strong> {selectedRequest.license_plate}
                                          </p>
                                        )}
                                        <p>
                                          <strong>État:</strong> {getConditionLabel(selectedRequest.vehicle_condition)}
                                        </p>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {selectedRequest.additional_info && (
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Informations complémentaires</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="whitespace-pre-wrap">{selectedRequest.additional_info}</p>
                                      </CardContent>
                                    </Card>
                                  )}
                                </TabsContent>

                                <TabsContent value="photos">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <ImageIcon className="h-5 w-5" />
                                        <span>Photos du véhicule</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      {selectedRequest.photo_urls && selectedRequest.photo_urls.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {selectedRequest.photo_urls.map((url, index) => (
                                            <div key={index} className="relative">
                                              <img
                                                src={url || "/placeholder.svg"}
                                                alt={`Photo ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg border"
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="text-center py-8">
                                          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                          <p className="text-muted-foreground">Aucune photo fournie</p>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                <TabsContent value="admin" className="space-y-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <Edit className="h-5 w-5" />
                                        <span>Gestion de la demande</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div>
                                        <Label htmlFor="status">Statut</Label>
                                        <Select
                                          value={selectedRequest.status}
                                          onValueChange={(value) =>
                                            updateRequestStatus(
                                              selectedRequest.id,
                                              value,
                                              selectedRequest.admin_notes || "",
                                            )
                                          }
                                          disabled={isUpdating}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pending">En attente</SelectItem>
                                            <SelectItem value="confirmed">Confirmé</SelectItem>
                                            <SelectItem value="in_progress">En cours</SelectItem>
                                            <SelectItem value="completed">Terminé</SelectItem>
                                            <SelectItem value="cancelled">Annulé</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div>
                                        <Label htmlFor="admin-notes">Notes administratives</Label>
                                        <Textarea
                                          id="admin-notes"
                                          value={selectedRequest.admin_notes || ""}
                                          onChange={(e) =>
                                            setSelectedRequest({ ...selectedRequest, admin_notes: e.target.value })
                                          }
                                          placeholder="Notes internes sur cette demande..."
                                          rows={4}
                                        />
                                        <Button
                                          className="mt-2"
                                          onClick={() =>
                                            updateRequestStatus(
                                              selectedRequest.id,
                                              selectedRequest.status,
                                              selectedRequest.admin_notes || "",
                                            )
                                          }
                                          disabled={isUpdating}
                                        >
                                          {isUpdating ? "Sauvegarde..." : "Sauvegarder les notes"}
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{request.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{request.city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.created_at).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune demande trouvée</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
