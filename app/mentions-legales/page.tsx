import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Phone, Mail } from "lucide-react"

export const metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales et informations juridiques de KA Auto Épaves, service d'enlèvement d'épaves automobiles en Centre-Val de Loire.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Mentions légales</h1>
                <p className="text-muted-foreground">Informations juridiques et légales</p>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Informations sur l'entreprise</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Dénomination sociale</h3>
                      <p>KA Auto Épaves</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Forme juridique</h3>
                      <p>Entreprise individuelle</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Siège social</h3>
                      <p>Centre-Val de Loire, France</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">SIRET</h3>
                      <p>XXX XXX XXX XXXXX</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Code APE</h3>
                      <p>3832Z - Récupération de déchets triés</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>Contact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+33 6 63 83 03 03</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>contact@ka-auto-epaves.fr</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Hébergement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Ce site est hébergé par Vercel Inc.</p>
                    <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Propriété intellectuelle</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur
                      et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les
                      documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                    <p>
                      La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                      formellement interdite sauf autorisation expresse du directeur de la publication.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Protection des données personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement
                      Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification,
                      de suppression et d'opposition aux données personnelles vous concernant.
                    </p>
                    <p>
                      Les informations recueillies sur ce site sont nécessaires au traitement de votre demande
                      d'enlèvement d'épave. Elles sont destinées à KA Auto Épaves et ne seront en aucun cas cédées ou
                      vendues à des tiers.
                    </p>
                    <p>Pour exercer vos droits, vous pouvez nous contacter à l'adresse : contact@ka-auto-epaves.fr</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cookies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne
                      collectent aucune information personnelle et ne peuvent pas être désactivés.
                    </p>
                    <p>
                      Nous utilisons également des cookies d'analyse (Vercel Analytics) pour améliorer l'expérience
                      utilisateur. Ces données sont anonymisées et ne permettent pas de vous identifier.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Responsabilité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      KA Auto Épaves s'efforce de fournir sur le site des informations aussi précises que possible.
                      Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences
                      dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui
                      fournissent ces informations.
                    </p>
                    <p>
                      Tous les informations indiquées sur le site sont données à titre indicatif, et sont susceptibles
                      d'évoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas exhaustifs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
