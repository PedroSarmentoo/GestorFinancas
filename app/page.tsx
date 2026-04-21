"use client"

import { useState } from "react"
import { CalendarRange } from "lucide-react"
import { BottomNavigation, type TabType } from "@/components/bottom-navigation"
import { AddTransactionModal } from "@/components/add-transaction-modal"
import { SaldosScreen } from "@/components/screens/saldos-screen"
import { TotaisScreen } from "@/components/screens/totais-screen"
import { HorizonteScreen } from "@/components/screens/horizonte-screen"
import { TagsScreen } from "@/components/screens/tags-screen"
import { MenuScreen } from "@/components/screens/menu-screen"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("saldos")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const renderScreen = () => {
    switch (activeTab) {
      case "saldos":
        return <SaldosScreen />
      case "totais":
        return <TotaisScreen />
      case "horizonte":
        return <HorizonteScreen />
      case "tags":
        return <TagsScreen />
      case "menu":
        return <MenuScreen />
      default:
        return <SaldosScreen />
    }
  }
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Mobile Container - Simulating smartphone aspect ratio */}
      <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden border border-border relative" style={{ height: "min(85vh, 800px)" }}>
        {/* Status Bar Simulation */}
        <div className="h-6 bg-foreground/5 flex items-center justify-between px-6 text-xs text-muted-foreground">
          <span>9:41</span>
          <span>100%</span>
        </div>
        
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-foreground">Horizonte</span>
          </div>
          
          {/* Horizonte Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === "horizonte" ? "saldos" : "horizonte")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              activeTab === "horizonte"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <CalendarRange className="h-4 w-4" />
            <span className="hidden sm:inline">Horizonte</span>
          </button>
        </header>
        
        {/* Main Content */}
        <main className="h-[calc(100%-6rem-4.5rem)] overflow-hidden">
          {renderScreen()}
        </main>
        
        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0">
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      
      {/* Add Transaction Modal */}
      <AddTransactionModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
