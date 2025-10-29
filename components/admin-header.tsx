"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// PostgreSQL client removed - using API routes instead
import { useRouter } from "next/navigation"
import { Car, LogOut, Menu, X, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  user?: {
    email: string
    first_name?: string
    last_name?: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push("/admin/login")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">KA Auto Épaves</h1>
              <p className="text-xs text-muted-foreground">Administration</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/admin/dashboard" className="text-foreground hover:text-primary transition-colors">
              Tableau de bord
            </Link>
            <Link href="/admin/requests" className="text-foreground hover:text-primary transition-colors">
              Demandes
            </Link>
            <Link href="/admin/messages" className="text-foreground hover:text-primary transition-colors">
              Messages
            </Link>
            <Link href="/admin/statistics" className="text-foreground hover:text-primary transition-colors">
              Statistiques
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/admin/dashboard"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tableau de bord
              </Link>
              <Link
                href="/admin/requests"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Demandes
              </Link>
              <Link
                href="/admin/messages"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                href="/admin/statistics"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Statistiques
              </Link>
              <div className="pt-4 border-t">
                <Button variant="outline" onClick={handleLogout} className="w-full text-red-600 bg-transparent">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
