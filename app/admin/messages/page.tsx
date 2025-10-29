"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Eye, Edit, Calendar, MessageCircle, Clock, CheckCircle } from "lucide-react"

interface ContactMessage {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  admin_notes: string | null
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
    setIsLoading(false)
  }

  const updateMessageStatus = async (messageId: string, status: string, adminNotes?: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageId, status, admin_notes: adminNotes })
      })
      
      if (response.ok) {
        await fetchMessages()
        if (selectedMessage?.id === messageId) {
          setSelectedMessage({ ...selectedMessage, status, admin_notes: adminNotes || selectedMessage.admin_notes })
        }
      }
    } catch (error) {
      console.error("Error updating message:", error)
    }
    setIsUpdating(false)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "Nouveau", variant: "default" as const, icon: MessageCircle },
      read: { label: "Lu", variant: "secondary" as const, icon: Eye },
      replied: { label: "Répondu", variant: "default" as const, icon: CheckCircle },
      archived: { label: "Archivé", variant: "outline" as const, icon: Clock },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Chargement des messages...</p>
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
          <h1 className="text-3xl font-bold mb-2">Messages de contact</h1>
          <p className="text-muted-foreground">Gérez tous les messages reçus via le formulaire de contact</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Messages ({messages.length})</CardTitle>
            <CardDescription>Liste de tous les messages de contact</CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">
                          {message.first_name} {message.last_name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {message.subject}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(message.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMessage(message)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Message de {selectedMessage?.first_name} {selectedMessage?.last_name}
                              </DialogTitle>
                            </DialogHeader>

                            {selectedMessage && (
                              <div className="space-y-4">
                                <div>
                                  <p><strong>Email:</strong> {selectedMessage.email}</p>
                                  <p><strong>Sujet:</strong> {selectedMessage.subject}</p>
                                  <p><strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleDateString("fr-FR")}</p>
                                </div>
                                
                                <div>
                                  <strong>Message:</strong>
                                  <p className="mt-2 p-3 bg-muted rounded">{selectedMessage.message}</p>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Statut</label>
                                  <Select
                                    value={selectedMessage.status}
                                    onValueChange={(value) => updateMessageStatus(selectedMessage.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">Nouveau</SelectItem>
                                      <SelectItem value="read">Lu</SelectItem>
                                      <SelectItem value="replied">Répondu</SelectItem>
                                      <SelectItem value="archived">Archivé</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <span>{message.email} • {new Date(message.created_at).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun message trouvé</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}