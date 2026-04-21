"use client"

import { Wallet, BarChart2, Tag, Menu, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabType = "saldos" | "totais" | "tags" | "menu" | "horizonte"

interface BottomNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  onAddClick: () => void
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "saldos", label: "Saldos", icon: <Wallet className="h-5 w-5" /> },
  { id: "totais", label: "Totais", icon: <BarChart2 className="h-5 w-5" /> },
  { id: "tags", label: "Tags", icon: <Tag className="h-5 w-5" /> },
  { id: "menu", label: "Menu", icon: <Menu className="h-5 w-5" /> },
]

export function BottomNavigation({ activeTab, onTabChange, onAddClick }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4 relative">
        {/* Left tabs */}
        {tabs.slice(0, 2).map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all",
              activeTab === tab.id 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
        
        {/* Center FAB */}
        <div className="relative -mt-8">
          <button
            onClick={onAddClick}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95"
            aria-label="Adicionar transação"
          >
            <Plus className="h-7 w-7" />
          </button>
        </div>
        
        {/* Right tabs */}
        {tabs.slice(2).map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all",
              activeTab === tab.id 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
