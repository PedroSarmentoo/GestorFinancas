"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, CreditCard, Tag, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TagItem {
  id: string
  name: string
  color: string
  type: "category" | "card"
  lastFour?: string
  limit?: number
  used?: number
}

const mockTags: TagItem[] = [
  { id: "1", name: "Alimentação", color: "#FF5722", type: "category" },
  { id: "2", name: "Transporte", color: "#2196F3", type: "category" },
  { id: "3", name: "Lazer", color: "#9C27B0", type: "category" },
  { id: "4", name: "Saúde", color: "#4CAF50", type: "category" },
  { id: "5", name: "Educação", color: "#FF9800", type: "category" },
  { id: "6", name: "Moradia", color: "#607D8B", type: "category" },
]

const mockCards: TagItem[] = [
  { id: "c1", name: "Nubank", color: "#820AD1", type: "card", lastFour: "4532", limit: 5000, used: 2300 },
  { id: "c2", name: "Itaú", color: "#EC7000", type: "card", lastFour: "8901", limit: 8000, used: 4500 },
  { id: "c3", name: "Inter", color: "#FF7A00", type: "card", lastFour: "1234", limit: 3000, used: 800 },
]

export function TagsScreen() {
  const [tags] = useState<TagItem[]>(mockTags)
  const [cards] = useState<TagItem[]>(mockCards)
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6 pb-24">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-foreground">Tags e Cartões</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas categorias</p>
        </div>
        
        {/* Categories Section */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Categorias</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Nova
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="grid grid-cols-2 gap-2">
              {tags.map(tag => (
                <div 
                  key={tag.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{tag.name}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded hover:bg-background">
                      <Edit2 className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Cards Section */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Cartões de Crédito</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Novo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-3">
            {cards.map(card => (
              <div 
                key={card.id}
                className="p-4 rounded-xl shadow-sm border transition-all hover:shadow-md"
                style={{ 
                  background: `linear-gradient(135deg, ${card.color}20 0%, ${card.color}10 100%)`,
                  borderColor: `${card.color}30`
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: card.color }}
                    />
                    <span className="font-semibold text-foreground">{card.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    •••• {card.lastFour}
                  </span>
                </div>
                
                {/* Usage Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Usado</span>
                    <span className="font-medium">
                      {formatCurrency(card.used || 0)} / {formatCurrency(card.limit || 0)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${((card.used || 0) / (card.limit || 1)) * 100}%`,
                        backgroundColor: card.color
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {Math.round(((card.used || 0) / (card.limit || 1)) * 100)}% utilizado
                    </span>
                    <span>
                      {formatCurrency((card.limit || 0) - (card.used || 0))} disponível
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Color Palette Info */}
        <Card className="border shadow-sm bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Personalize suas cores</p>
                <p className="text-xs text-muted-foreground">
                  Toque em uma categoria para editar sua cor
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
