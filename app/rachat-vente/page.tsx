import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Euro, CheckCircle, Phone, Mail, MapPin, Star, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Rachat et Vente de Véhicules - KA Auto Épaves | Centre-Val de Loire",
  description:
    "Vendez votre voiture cash rapidement ou trouvez votre prochaine bonne affaire. Service de rachat et vente de véhicules d'occasion dans le Centre-Val de Loire.",
  keywords:
    "rachat voiture cash, vendre ma voiture rapidement, reprise véhicule occasion, achat vente auto particulier, trouver bonne affaire voiture, Centre-Val de Loire",
}

export default function RachatVentePage() {
  const departments = [
    { name: "Cher", code: "18" },
    { name: "Eure-et-Loir", code: "28" },
    { name: "Indre", code: "36" },
    { name: "Indre-et-Loire", code: "37" },
    { name: "Loir-et-Cher", code: "41" },
    { name: "Loiret", code: "45" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 animate-in fade-in duration-1000">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Vendez votre voiture cash ou trouvez votre prochaine bonne affaire
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Passionné d'automobile dans le Centre-Val de Loire, je vous propose une solution simple et directe pour
              vendre votre voiture au juste prix ou pour acheter un véhicule d'occasion sélectionné par mes soins. Pas
              d'intermédiaire, pas de frais cachés, juste une transaction rapide et honnête.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#vendre">Vendre mon véhicule</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#acheter">Trouver une bonne affaire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Section */}
      <section id="vendre" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vendez Votre Véhicule Facilement et Sans Contrainte
              </h2>
              <p className="text-lg text-muted-foreground">
                Un processus simple en 3 étapes pour vendre votre voiture rapidement
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-in slide-in-from-left-5 delay-100">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Contact et description</h3>
                  <p className="text-muted-foreground">
                    Appelez-moi ou envoyez-moi les détails de votre véhicule (marque, modèle, année, état général).
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-in slide-in-from-bottom-5 delay-200">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Euro className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Proposition rapide</h3>
                  <p className="text-muted-foreground">
                    Je vous fais une proposition de rachat ferme, souvent dans la journée.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-in slide-in-from-right-5 delay-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Paiement immédiat</h3>
                  <p className="text-muted-foreground">
                    Si l'offre vous convient, nous fixons un rendez-vous. Le paiement est sécurisé et immédiat, et je
                    m'occupe des démarches.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/contact">Estimer mon véhicule maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Buying Section */}
      <section id="acheter" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                À la Recherche d'un Véhicule ? Découvrez mes opportunités !
              </h2>
              <p className="text-lg text-muted-foreground">
                Je n'ai pas de parc permanent, mais je déniche régulièrement des véhicules d'occasion de qualité
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left-5 delay-100">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Véhicules sélectionnés</h3>
                      <p className="text-muted-foreground">
                        Chaque véhicule est choisi selon des critères stricts de qualité et de rapport qualité-prix. Je
                        privilégie les voitures avec un historique clair et un entretien suivi.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-right-5 delay-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Transparence totale</h3>
                      <p className="text-muted-foreground">
                        Aucun défaut caché. Je vous présente l'état réel du véhicule, ses points forts et ses éventuels
                        défauts. Vous achetez en toute connaissance de cause.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left-5 delay-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Service personnalisé</h3>
                      <p className="text-muted-foreground">
                        Décrivez-moi vos besoins (budget, type de véhicule, usage) et je vous contacte dès qu'une
                        opportunité correspond à vos critères.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-right-5 delay-400">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Réactivité</h3>
                      <p className="text-muted-foreground">
                        Les bonnes affaires ne durent pas ! Je vous préviens rapidement quand j'ai un véhicule qui
                        pourrait vous intéresser.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/contact">Je recherche un véhicule</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Zone d'intervention - Centre-Val de Loire
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Je me déplace dans tous les départements du Centre-Val de Loire pour vos rachats et ventes de véhicules
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {departments.map((dept, index) => (
                <Card key={dept.code} className="text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-4">
                    <MapPin className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">({dept.code})</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à vendre ou acheter votre véhicule ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez-moi dès maintenant pour une estimation gratuite ou pour connaître mes opportunités du moment
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="font-bold text-lg">+33 6 63 83 03 03</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>contact@ka-autoepaves.fr</span>
              </div>
            </div>

            <div className="mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Me contacter maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
