import Link from "next/link"
import { Car, Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.png" 
                alt="KA Auto Épaves" 
                className="h-10 w-10 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold">KA Auto Épaves</h3>
                <p className="text-sm text-gray-400">Centre-Val de Loire</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Service professionnel d'enlèvement d'épaves automobiles. Intervention rapide et gratuite dans toute la
              région Centre-Val de Loire.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/demande" className="text-gray-300 hover:text-primary transition-colors">
                  Demande d'enlèvement
                </Link>
              </li>
              <li>
                <Link href="/zone-intervention" className="text-gray-300 hover:text-primary transition-colors">
                  Zone d'intervention
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/rachat-vente" className="text-gray-300 hover:text-primary transition-colors">
                  Rachat/Vente
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300">+33 6 63 83 03 03</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300">contact@ka-autoepaves.fr</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-gray-300">Centre-Val de Loire</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-gray-300">Lun - Ven: 8h - 18h</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-gray-300">Sam: 8h - 12h</span>
              </li>
              <li className="text-gray-300 ml-6">Dimanche: Fermé</li>
              <li className="text-sm text-primary mt-2">Urgences 24h/24</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 KA Auto Épaves. Tous droits réservés. Powered by PhOeNiX. |
            <Link href="/mentions-legales" className="hover:text-primary transition-colors ml-1">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
