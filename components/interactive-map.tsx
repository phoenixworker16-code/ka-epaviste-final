"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface InteractiveMapProps {
  className?: string
}

export function InteractiveMap({ className }: InteractiveMapProps) {
  const departments = [
    { name: "Cher", code: "18", color: "bg-blue-500" },
    { name: "Eure-et-Loir", code: "28", color: "bg-green-500" },
    { name: "Indre", code: "36", color: "bg-purple-500" },
    { name: "Indre-et-Loire", code: "37", color: "bg-red-500" },
    { name: "Loir-et-Cher", code: "41", color: "bg-yellow-500" },
    { name: "Loiret", code: "45", color: "bg-orange-500" },
  ]

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
      </CardHeader>
      <CardContent>
        {/* Google Maps Embed */}
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1305515.8947!2d1.0847!3d47.2383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4e8b1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sCentre-Val%20de%20Loire%2C%20France!5e0!3m2!1sfr!2sfr!4v1640000000000!5m2!1sfr!2sfr&zoom=8"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zone d'intervention KA Auto Épaves - Centre-Val de Loire"
          />
        </div>

        {/* Department List */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {departments.map((dept) => (
            <div key={dept.code} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-3 h-3 ${dept.color} rounded-full`} />
              <span className="text-sm font-medium">
                {dept.name} ({dept.code})
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary">
            <MapPin className="inline h-4 w-4 mr-1" />
            <strong>Zone de couverture :</strong> Intervention dans tous les départements du Centre-Val de Loire avec des délais d'intervention de 24h à 72h selon la localisation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
