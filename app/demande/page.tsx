"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { Upload, X, Camera, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { ScrollToTop } from "@/components/scroll-to-top"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleBrand: string
  vehicleModel: string
  vehicleYear: string
  licensePlate: string
  vehicleCondition: string
  address: string
  city: string
  postalCode: string
  additionalInfo: string
  acceptTerms: boolean
}

export default function RequestPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleYear: "",
    licensePlate: "",
    vehicleCondition: "",
    address: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
    acceptTerms: false,
  })

  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/")
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB
      return isValidType && isValidSize
    })

    setPhotos((prev) => [...prev, ...validFiles].slice(0, 5)) // Max 5 photos
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadPhotos = async (photos: File[]): Promise<string[]> => {
    const photoUrls: string[] = []

    for (const photo of photos) {
      const formData = new FormData()
      formData.append('file', photo)
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (response.ok) {
          const data = await response.json()
          photoUrls.push(data.url)
        }
      } catch (error) {
        console.error('Error uploading photo:', error)
      }
    }

    return photoUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Upload photos first
      const photoUrls = photos.length > 0 ? await uploadPhotos(photos) : []

      // Submit the request
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          vehicle_brand: formData.vehicleBrand,
          vehicle_model: formData.vehicleModel,
          vehicle_year: formData.vehicleYear ? Number.parseInt(formData.vehicleYear) : null,
          license_plate: formData.licensePlate,
          vehicle_condition: formData.vehicleCondition,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          additional_info: formData.additionalInfo,
          photo_urls: photoUrls,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      setSubmitStatus("success")
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push("/demande/succes")
      }, 2000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setSubmitStatus("error")
      setErrorMessage("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Demande envoyée !</CardTitle>
              <CardDescription>Nous vous contacterons très rapidement</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Redirection en cours...</p>
            </CardContent>
          </Card>
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
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Demande d'enlèvement</h1>
              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Remplissez ce formulaire pour demander l'enlèvement gratuit de votre épave automobile. Nous vous
                contacterons rapidement.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Informations personnelles</span>
                    </CardTitle>
                    <CardDescription>Vos coordonnées pour vous contacter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Votre prénom"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="votre@email.fr"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+33 6 63 83 03 03"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Information */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                      <span>Informations du véhicule</span>
                    </CardTitle>
                    <CardDescription>Détails sur le véhicule à enlever</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="vehicleBrand">Marque *</Label>
                        <Input
                          id="vehicleBrand"
                          value={formData.vehicleBrand}
                          onChange={(e) => handleInputChange("vehicleBrand", e.target.value)}
                          placeholder="ex: Renault"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicleModel">Modèle *</Label>
                        <Input
                          id="vehicleModel"
                          value={formData.vehicleModel}
                          onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                          placeholder="ex: Clio"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicleYear">Année</Label>
                        <Input
                          id="vehicleYear"
                          type="number"
                          min="1950"
                          max="2024"
                          value={formData.vehicleYear}
                          onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                          placeholder="ex: 2010"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="licensePlate">Plaque d'immatriculation</Label>
                        <Input
                          id="licensePlate"
                          value={formData.licensePlate}
                          onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                          placeholder="ex: AB-123-CD"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicleCondition">État du véhicule *</Label>
                        <Select
                          value={formData.vehicleCondition}
                          onValueChange={(value) => handleInputChange("vehicleCondition", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez l'état" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accidente">Accidenté</SelectItem>
                            <SelectItem value="en_panne">En panne</SelectItem>
                            <SelectItem value="hors_service">Hors service</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Information */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Localisation du véhicule</CardTitle>
                    <CardDescription>Où se trouve le véhicule à enlever</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Numéro et nom de rue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Nom de la ville"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          placeholder="ex: 45000"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Photos Upload */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5 text-primary" />
                      <span>Photos du véhicule</span>
                    </CardTitle>
                    <CardDescription>
                      Ajoutez des photos pour nous aider à évaluer l'état du véhicule (optionnel, max 5 photos)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Upload Button */}
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="photo-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Cliquez pour ajouter</span> des photos
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG jusqu'à 5MB (max 5 photos)</p>
                          </div>
                          <input
                            id="photo-upload"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                      </div>

                      {/* Photo Preview */}
                      {photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(photo) || "/placeholder.svg"}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Informations complémentaires</CardTitle>
                    <CardDescription>Détails supplémentaires qui pourraient nous être utiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="additionalInfo">Commentaires</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        placeholder="Précisions sur l'état du véhicule, l'accessibilité, horaires préférés..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Submit */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                          required
                        />
                        <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                          J'accepte que mes données personnelles soient utilisées pour traiter ma demande d'enlèvement
                          d'épave. Je peux exercer mes droits d'accès, de rectification et de suppression en contactant
                          KA Auto Épaves.
                        </Label>
                      </div>

                      {submitStatus === "error" && (
                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                          <AlertCircle className="h-5 w-5" />
                          <p className="text-sm">{errorMessage}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting || !formData.acceptTerms}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Nous vous contacterons dans les 24h pour confirmer votre demande et planifier l'enlèvement.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
        </section>

        {/* Scroll to top component */}
        <ScrollToTop />
      </main>

      <Footer />
    </div>
  )
}
