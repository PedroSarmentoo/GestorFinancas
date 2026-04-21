"use client"

import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface MenuItem {
  icon: React.ReactNode
  label: string
  description?: string
  action?: () => void
  toggle?: boolean
}

export function MenuScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  
  const menuSections = [
    {
      title: "Conta",
      items: [
        { 
          icon: <User className="h-5 w-5" />, 
          label: "Meu Perfil", 
          description: "Gerencie seus dados pessoais" 
        },
        { 
          icon: <Bell className="h-5 w-5" />, 
          label: "Notificações", 
          description: notifications ? "Ativadas" : "Desativadas",
          toggle: true,
          checked: notifications,
          onToggle: () => setNotifications(!notifications)
        },
      ]
    },
    {
      title: "Preferências",
      items: [
        { 
          icon: darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />, 
          label: "Tema Escuro", 
          description: darkMode ? "Ativado" : "Desativado",
          toggle: true,
          checked: darkMode,
          onToggle: () => setDarkMode(!darkMode)
        },
        { 
          icon: <Settings className="h-5 w-5" />, 
          label: "Configurações", 
          description: "Ajustes do aplicativo" 
        },
      ]
    },
    {
      title: "Segurança",
      items: [
        { 
          icon: <Shield className="h-5 w-5" />, 
          label: "Privacidade", 
          description: "Gerencie seus dados" 
        },
      ]
    },
    {
      title: "Suporte",
      items: [
        { 
          icon: <HelpCircle className="h-5 w-5" />, 
          label: "Ajuda", 
          description: "Central de ajuda" 
        },
      ]
    }
  ]
  
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6 pb-24">
        {/* User Header */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            HS
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Horizonte Saldos</h1>
            <p className="text-sm text-muted-foreground">usuario@email.com</p>
            <p className="text-xs text-primary font-medium mt-1">Plano Gratuito</p>
          </div>
        </div>
        
        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {section.title}
            </h2>
            <Card className="border shadow-sm">
              <CardContent className="p-0 divide-y divide-border">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch 
                        checked={item.checked} 
                        onCheckedChange={item.onToggle}
                      />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
        
        {/* Logout Button */}
        <Card className="border border-destructive/20 shadow-sm">
          <CardContent className="p-0">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-destructive/5 transition-colors text-destructive">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Sair da Conta</span>
            </button>
          </CardContent>
        </Card>
        
        {/* Version */}
        <p className="text-center text-xs text-muted-foreground">
          Horizonte Saldos v1.0.0
        </p>
      </div>
    </ScrollArea>
  )
}
