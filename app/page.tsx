import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import {
  Car,
  Clock,
  Shield,
  Truck,
  Phone,
  CheckCircle,
  MapPin,
  Wrench,
  AlertTriangle,
  Zap,
  Leaf,
  Star,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-3">
                Enlèvement gratuit d'épaves automobiles
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-4 max-w-2xl mx-auto">
                Service professionnel et rapide dans le Loir-et-Cher. Nous nous occupons de tout, de l'enlèvement aux
                démarches administratives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/demande">
                    <Car className="mr-2 h-5 w-5" />
                    Demande gratuite
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="tel:+33663830303">
                    <Phone className="mr-2 h-5 w-5" />
                    +33 6 63 83 03 03
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-2">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_mflg38mflg38mflg.jpg-oQxeywPlwYRQUESscaJ902Rh0J6sUO.jpeg"
                alt="KA Auto Épaves - Camion de dépannage professionnel en action"
                className="w-full h-auto rounded-lg shadow-xl mb-2 max-h-[500px] object-cover"
              />
              <p className="text-lg text-muted-foreground">
                Notre équipe professionnelle intervient rapidement avec du matériel adapté pour l'enlèvement de tous
                types de véhicules.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Nos services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un service complet pour l'enlèvement de votre véhicule hors d'usage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Enlèvement gratuit</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Intervention rapide et gratuite, quel que soit l'état de votre véhicule
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Démarches admin</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Nous nous occupons de toutes les formalités administratives
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Intervention rapide</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Enlèvement sous 24-48h après validation de votre demande
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Service agréé</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Centre agréé pour le traitement écologique des véhicules
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Types of Vehicles */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Véhicules acceptés</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous enlevons tous types de véhicules, quel que soit leur état
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg p-4 rounded-lg hover:bg-red-50">
                <div className="mx-auto bg-red-100 p-4 rounded-full w-fit mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Véhicules accidentés</h3>
                <p className="text-sm text-muted-foreground">Voitures endommagées suite à un accident</p>
              </div>

              <div className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg p-4 rounded-lg hover:bg-yellow-50">
                <div className="mx-auto bg-yellow-100 p-4 rounded-full w-fit mb-4">
                  <Wrench className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Véhicules en panne</h3>
                <p className="text-sm text-muted-foreground">Voitures qui ne démarrent plus ou irréparables</p>
              </div>

              <div className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg p-4 rounded-lg hover:bg-gray-50">
                <div className="mx-auto bg-gray-100 p-4 rounded-full w-fit mb-4">
                  <Car className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-semibold mb-2">Véhicules hors service</h3>
                <p className="text-sm text-muted-foreground">Voitures anciennes ou abandonnées</p>
              </div>

              <div className="text-center transition-all duration-300 hover:scale-105 hover:shadow-lg p-4 rounded-lg hover:bg-blue-50">
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Tous véhicules</h3>
                <p className="text-sm text-muted-foreground">Voitures, motos, utilitaires, camions</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2 group-hover:bg-green-200 transition-colors">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Écologie</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Recyclage responsable et respect de l'environnement</p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2 group-hover:bg-blue-200 transition-colors">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Fiabilité</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Service professionnel et ponctuel garanti</p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-2 group-hover:bg-orange-200 transition-colors">
                    <MapPin className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Proximité</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Service local et accompagnement personnalisé</p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="mx-auto bg-yellow-100 p-3 rounded-full w-fit mb-2 group-hover:bg-yellow-200 transition-colors">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg">Excellence</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Qualité de service et satisfaction client</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'enlever votre épave ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Faites votre demande en ligne en quelques minutes. C'est gratuit et sans engagement.
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
                <Link href="/zone-intervention">
                  <MapPin className="mr-2 h-5 w-5" />
                  Voir notre zone
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
