import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Phone, Mail, Clock, ArrowLeft } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success Message */}
              <div className="mb-8">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Demande envoyée avec succès !</h1>
                <p className="text-xl text-muted-foreground">
                  Merci pour votre confiance. Nous avons bien reçu votre demande d'enlèvement d'épave.
                </p>
              </div>

              {/* Next Steps */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Prochaines étapes</span>
                  </CardTitle>
                  <CardDescription>Voici ce qui va se passer maintenant</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-sm font-bold text-primary px-2">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Confirmation sous 2h</h3>
                        <p className="text-sm text-muted-foreground">
                          Nous examinerons votre demande et vous contacterons pour confirmer les détails.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-sm font-bold text-primary px-2">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Planification</h3>
                        <p className="text-sm text-muted-foreground">
                          Nous planifierons ensemble le créneau d'enlèvement qui vous convient.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-sm font-bold text-primary px-2">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Enlèvement gratuit</h3>
                        <p className="text-sm text-muted-foreground">
                          Notre équipe viendra enlever votre véhicule aux horaires convenus.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Besoin de nous contacter ?</CardTitle>
                  <CardDescription>Notre équipe reste à votre disposition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">+33 6 63 83 03 03</p>
                        <p className="text-xs text-muted-foreground">Disponible 7j/7</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">contact@ka-autoepaves.fr</p>
                        <p className="text-xs text-muted-foreground">Réponse sous 24h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Important :</strong> Gardez votre carte grise et votre pièce d'identité à portée de main pour
                  l'enlèvement. Nous nous occupons de toutes les autres démarches administratives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
