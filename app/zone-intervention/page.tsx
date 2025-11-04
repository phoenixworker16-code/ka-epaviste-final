import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InteractiveMap } from "@/components/interactive-map"
import { MapPin, Clock, Phone, CheckCircle, Navigation } from "lucide-react"
import Link from "next/link"
import ScrollToTop from "@/components/scroll-to-top"

export default function ZoneInterventionPage() {
  const departments = [
    { name: "Cher", code: "18", cities: ["Bourges", "Vierzon", "Saint-Amand-Montrond"] },
    { name: "Eure-et-Loir", code: "28", cities: ["Chartres", "Dreux", "Châteaudun"] },
    { name: "Indre", code: "36", cities: ["Châteauroux", "Issoudun", "La Châtre"] },
    { name: "Indre-et-Loire", code: "37", cities: ["Tours", "Chinon", "Loches"] },
    { name: "Loir-et-Cher", code: "41", cities: ["Blois", "Romorantin-Lanthenay", "Vendôme"] },
    { name: "Loiret", code: "45", cities: ["Orléans", "Montargis", "Pithiviers"] },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 animate-in fade-in duration-1000">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 animate-in slide-in-from-top-5 delay-200">Zone d'intervention</h1>
              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Nous intervenons dans le Loir-et-Cher pour l'enlèvement gratuit de vos épaves
                automobiles.
              </p>
              <Button size="lg" asChild>
                <Link href="/demande">
                  <Navigation className="mr-2 h-5 w-5" />
                  Faire une demande
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="py-2">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* Departments Coverage */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Départements couverts</h2>
                <p className="text-muted-foreground">
                  Nous intervenons dans le Loir-et-Cher
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept, index) => (
                  <Card
                    key={dept.code}
                    className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5 animate-in slide-in-from-bottom-5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{dept.name}</CardTitle>
                          <CardDescription>Département {dept.code}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">Principales villes desservies :</p>
                      <ul className="space-y-1">
                        {dept.cities.map((city) => (
                          <li key={city} className="text-sm flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{city}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Détails du service</h2>
                <p className="text-muted-foreground">Informations pratiques sur nos interventions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50 animate-in slide-in-from-left-5 delay-100">
                  <CardHeader className="pb-3">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Délais d'intervention</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Zone prioritaire:</span> 24h
                      </p>
                      <p>
                        <span className="font-medium">Zone standard:</span> 48h
                      </p>
                      <p>
                        <span className="font-medium">Zone éloignée:</span> 72h
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-50 animate-in slide-in-from-bottom-5 delay-200">
                  <CardHeader className="pb-3">
                    <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
                      <MapPin className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Accessibilité</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1 text-sm">
                      <p>✓ Domicile privé</p>
                      <p>✓ Parking public</p>
                      <p>✓ Garage/atelier</p>
                      <p>✓ Bord de route</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-50 animate-in slide-in-from-right-5 delay-300">
                  <CardHeader className="pb-3">
                    <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-2">
                      <Phone className="h-8 w-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Contact local</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">+33 6 63 83 03 03</p>
                      <p>Disponible 7j/7</p>
                      <p>Urgences 24h/24</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Votre véhicule est dans notre zone ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Faites votre demande d'enlèvement gratuit en quelques minutes. Nous vous confirmerons rapidement notre
              intervention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demande">Faire une demande</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="tel:+33663830303">
                  <Phone className="mr-2 h-5 w-5" />
                  Appeler maintenant
                </Link>
              </Button>
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
