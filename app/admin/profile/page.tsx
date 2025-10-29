"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Mail, 
  Shield, 
  Key, 
  Bell, 
  LogOut, 
  Settings, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle 
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [notifications, setNotifications] = useState({
    newRequests: true,
    newMessages: true,
    weeklyReport: true
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [updateStatus, setUpdateStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setErrorMessage("")

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas")
      setUpdateStatus("error")
      setIsUpdating(false)
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères")
      setUpdateStatus("error")
      setIsUpdating(false)
      return
    }

    // Simulation - remplacer par vraie API
    setTimeout(() => {
      setUpdateStatus("success")
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setIsUpdating(false)
    }, 1000)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profil administrateur</h1>
            <p className="text-muted-foreground">Gérez vos informations et paramètres de compte</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Informations du profil */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Informations personnelles</span>
                  </CardTitle>
                  <CardDescription>Vos informations de compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Prénom</Label>
                      <Input value="Admin" disabled />
                    </div>
                    <div>
                      <Label>Nom</Label>
                      <Input value="Principal" disabled />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value="admin@votredomaine.fr" disabled />
                  </div>
                  <div>
                    <Label>Rôle</Label>
                    <Badge variant="default" className="flex items-center space-x-1 w-fit">
                      <Shield className="h-3 w-3" />
                      <span>Super Administrateur</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Changement de mot de passe */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5 text-primary" />
                    <span>Sécurité</span>
                  </CardTitle>
                  <CardDescription>Modifiez votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>

                    {updateStatus === "success" && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="h-5 w-5" />
                        <p className="text-sm">Mot de passe modifié avec succès</p>
                      </div>
                    )}

                    {updateStatus === "error" && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Modification..." : "Modifier le mot de passe"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Notifications</span>
                  </CardTitle>
                  <CardDescription>Gérez vos préférences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouvelles demandes</p>
                      <p className="text-xs text-muted-foreground">Email pour chaque demande</p>
                    </div>
                    <Switch
                      checked={notifications.newRequests}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newRequests: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouveaux messages</p>
                      <p className="text-xs text-muted-foreground">Email pour chaque message</p>
                    </div>
                    <Switch
                      checked={notifications.newMessages}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newMessages: checked }))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rapport hebdomadaire</p>
                      <p className="text-xs text-muted-foreground">Résumé chaque lundi</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReport: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/admin/dashboard">
                      <Settings className="mr-2 h-4 w-4" />
                      Tableau de bord
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/admin/requests">
                      <User className="mr-2 h-4 w-4" />
                      Gérer les demandes
                    </a>
                  </Button>
                  
                  <Separator />
                  
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}