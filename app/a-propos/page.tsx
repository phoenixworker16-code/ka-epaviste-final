import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Leaf, Award, CheckCircle } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">À propos de KA Auto Épaves</h1>
              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Votre partenaire de confiance pour l'enlèvement d'épaves automobiles dans le Loir-et-Cher depuis plus
                de 10 ans.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Fondée en 2014, KA Auto Épaves est née de la volonté de proposer un service d'enlèvement d'épaves
                      automobiles professionnel et respectueux de l'environnement dans le Loir-et-Cher.
                    </p>
                    <p>
                      Fort de notre expérience et de notre engagement écologique, nous avons développé un réseau de
                      partenaires agréés pour garantir un traitement optimal de chaque véhicule hors d'usage.
                    </p>
                    <p>
                      Aujourd'hui, nous sommes fiers d'avoir traité plus de 5000 véhicules tout en maintenant notre
                      engagement pour un service gratuit et de qualité.
                    </p>
                  </div>
                </div>
                <div className="bg-muted/30 p-8 rounded-lg">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">10+</div>
                      <div className="text-sm text-muted-foreground">Années d'expérience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                      <div className="text-sm text-muted-foreground">Véhicules traités</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">24h</div>
                      <div className="text-sm text-muted-foreground">Délai moyen</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Gratuit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-3">Nos valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-50">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Écologie</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Traitement respectueux de l'environnement et recyclage responsable
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Fiabilité</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Service professionnel et ponctuel, respect des engagements
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-50">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-2">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Proximité</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Écoute client et accompagnement personnalisé</p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-50">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-2">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Excellence</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Amélioration continue de nos services et processus</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Notre processus</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un processus simple et transparent pour votre tranquillité
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Demande en ligne</h3>
                  <p className="text-sm text-muted-foreground">
                    Remplissez notre formulaire avec les détails de votre véhicule
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Validation</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous validons votre demande et planifions l'intervention
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Enlèvement</h3>
                  <p className="text-sm text-muted-foreground">
                    Notre équipe vient enlever votre véhicule gratuitement
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Traitement</h3>
                  <p className="text-sm text-muted-foreground">Traitement écologique et démarches administratives</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-3">Nos agréments</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des certifications qui garantissent la qualité de nos services
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-50">
                  <CardHeader className="pb-3">
                    <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Centre agréé VHU</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Agréé pour le traitement des Véhicules Hors d'Usage</p>
                  </CardContent>
                </Card>

                <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50">
                  <CardHeader className="pb-3">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Assurance pro</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Couverture complète pour tous nos services</p>
                  </CardContent>
                </Card>

                <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-50">
                  <CardHeader className="pb-3">
                    <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-2">
                      <Leaf className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Norme ISO 14001</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">Management environnemental certifié</p>
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
