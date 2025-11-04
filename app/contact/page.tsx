"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Erreur ${response.status}: ${errorData}`)
      }

      setSubmitStatus("success")
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting contact:", error)
      setSubmitStatus("error")
      setErrorMessage("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-10 animate-in fade-in duration-1000">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4 animate-in slide-in-from-top-5 delay-200">Contactez-nous</h1>
              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Une question ? Besoin d'informations ? Notre équipe est à votre disposition pour vous accompagner dans
                vos démarches.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>

                  <div className="space-y-6">
                    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left-5 delay-100">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Téléphone</CardTitle>
                            <CardDescription>Disponible 7j/7</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">+33 6 63 83 03 03</p>
                        <p className="text-sm text-muted-foreground mt-1">Urgences 24h/24</p>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left-5 delay-200">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Email</CardTitle>
                            <CardDescription>Réponse sous 24h</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">contact@ka-auto-epaves.fr</p>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left-5 delay-300">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Zone d'intervention</CardTitle>
                            <CardDescription>Toute la région</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">le Loir-et-Cher</p>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left-5 delay-400">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Horaires</CardTitle>
                            <CardDescription>Bureau administratif</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p>
                            <span className="font-medium">Lun - Ven:</span> 8h - 18h
                          </p>
                          <p>
                            <span className="font-medium">Samedi:</span> 8h - 12h
                          </p>
                          <p>
                            <span className="font-medium">Dimanche:</span> Fermé
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>

                  <Card className="group hover:shadow-lg transition-all duration-300 animate-in slide-in-from-right-5 delay-200">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <CardTitle>Formulaire de contact</CardTitle>
                      </div>
                      <CardDescription>Remplissez ce formulaire et nous vous répondrons rapidement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {submitStatus === "success" ? (
                        <div className="text-center py-8">
                          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Message envoyé avec succès !</h3>
                          <p className="text-muted-foreground mb-4">
                            Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                          </p>
                          <Button onClick={() => setSubmitStatus("idle")} variant="outline">
                            Envoyer un autre message
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="+33 6 63 83 03 03" 
                            />
                          </div>

                          <div>
                            <Label htmlFor="subject">Sujet *</Label>
                            <Input 
                              id="subject" 
                              value={formData.subject}
                              onChange={(e) => handleInputChange("subject", e.target.value)}
                              placeholder="Objet de votre message" 
                              required 
                            />
                          </div>

                          <div>
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) => handleInputChange("message", e.target.value)}
                              placeholder="Décrivez votre demande ou votre question..."
                              rows={5}
                              required
                            />
                          </div>

                          {submitStatus === "error" && (
                            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                              <AlertCircle className="h-5 w-5" />
                              <p className="text-sm">{errorMessage}</p>
                            </div>
                          )}

                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            <Send className="mr-2 h-4 w-4" />
                            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Questions fréquentes</h2>
                <p className="text-muted-foreground">Les réponses aux questions les plus courantes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">L'enlèvement est-il vraiment gratuit ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Oui, notre service d'enlèvement est entièrement gratuit. Aucun frais caché, nous nous rémunérons
                      sur la valorisation des matériaux.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quels documents fournir ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Carte grise du véhicule et pièce d'identité du propriétaire. Nous nous occupons de toutes les
                      autres démarches.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quel est le délai d'intervention ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Généralement sous 24-48h après validation de votre demande, selon votre localisation et nos
                      disponibilités.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Intervenez-vous partout ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Nous couvrons le Loir-et-Cher. Contactez-nous pour vérifier si votre zone est
                      desservie.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll to Top Component */}
        <ScrollToTop />
      </main>

      <Footer />
    </div>
  )
}
