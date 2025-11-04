"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Car, Phone, Home, FileText, MapPin, Info, Mail, DollarSign } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="KA Auto Épaves" 
              className="h-10 w-10 rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">KA Auto Épaves</h1>
              <p className="text-xs text-muted-foreground">le Loir-et-Cher</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-bold"
            >
              <Home className="h-4 w-4 text-primary" />
              <span>Accueil</span>
            </Link>
            <Link
              href="/demande"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-bold"
            >
              <FileText className="h-4 w-4 text-primary" />
              <span>Demande d'enlèvement</span>
            </Link>
            <Link
              href="/rachat-vente"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-bold"
            >
              <DollarSign className="h-4 w-4 text-primary" />
              <span>Rachat/Vente</span>
            </Link>
            <Link
              href="/zone-intervention"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-bold"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span>Zone d'intervention</span>
            </Link>
            <Link
              href="/a-propos"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-bold"
            >
              <Info className="h-4 w-4 text-primary" />
              <span>À propos</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-bold"
            >
              <Mail className="h-4 w-4 text-primary" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-bold">+33 6 63 83 03 03</span>
            </div>
            <Button asChild>
              <Link href="/demande">Demande gratuite</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4 text-primary" />
                <span>Accueil</span>
              </Link>
              <Link
                href="/demande"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Demande d'enlèvement</span>
              </Link>
              <Link
                href="/rachat-vente"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <DollarSign className="h-4 w-4 text-primary" />
                <span>Rachat/Vente</span>
              </Link>
              <Link
                href="/zone-intervention"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>Zone d'intervention</span>
              </Link>
              <Link
                href="/a-propos"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-4 w-4 text-primary" />
                <span>À propos</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>Contact</span>
              </Link>
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm mb-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-bold">+33 6 63 83 03 03</span>
                </div>
                <Button asChild className="w-full">
                  <Link href="/demande">Demande gratuite</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
