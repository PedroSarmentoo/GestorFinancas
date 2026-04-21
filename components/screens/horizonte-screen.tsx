"use client"

import { useMemo } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ProjectionData {
  day: number
  months: { balance: number; risk: number }[]
}

// Generate mock projection data for 3 months
function generateProjectionData(): { months: string[], data: ProjectionData[] } {
  const today = new Date()
  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]
  
  const months = [0, 1, 2].map(offset => {
    const month = (today.getMonth() + offset) % 12
    const year = today.getFullYear() + Math.floor((today.getMonth() + offset) / 12)
    return `${monthNames[month]}/${String(year).slice(2)}`
  })
  
  const data: ProjectionData[] = []
  
  // Get max days (use 31 to show all possible days)
  const maxDays = 31
  
  for (let day = 1; day <= maxDays; day++) {
    const monthBalances = [0, 1, 2].map(monthOffset => {
      // Base balance with some randomness
      const baseBalance = 5000 - (day * 150) + (monthOffset * 200)
      // Add income on days 5 and 20
      const incomeBoost = (day >= 5 ? 2500 : 0) + (day >= 20 ? 2500 : 0)
      // Random daily expense
      const expenses = Math.random() * 100 * day
      
      const balance = Math.round(baseBalance + incomeBoost - expenses)
      
      // Risk calculation (0-1): lower balance = higher risk
      const risk = Math.max(0, Math.min(1, (3000 - balance) / 5000))
      
      return { balance, risk }
    })
    
    data.push({ day, months: monthBalances })
  }
  
  return { months, data }
}

// Get heatmap color based on risk level
function getHeatmapColor(risk: number, balance: number): string {
  if (balance < 0) {
    return "bg-destructive/30 text-destructive"
  }
  if (risk > 0.7) {
    return "bg-destructive/20 text-destructive"
  }
  if (risk > 0.4) {
    return "bg-warning-light text-warning-foreground"
  }
  if (risk > 0.2) {
    return "bg-success-light/50 text-success"
  }
  return "bg-success-light text-success"
}

export function HorizonteScreen() {
  const { months, data } = useMemo(() => generateProjectionData(), [])
  
  const formatCurrency = (value: number) => {
    if (value >= 1000 || value <= -1000) {
      return `${(value / 1000).toFixed(1)}k`
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  const today = new Date().getDate()
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center py-4 border-b border-border">
        <h1 className="text-lg font-bold text-foreground">Horizonte de Saldos</h1>
        <p className="text-xs text-muted-foreground">Projeção baseada na média de gastos</p>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 py-3 px-4 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-success-light"></span>
          <span className="text-xs text-muted-foreground">Seguro</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-warning-light"></span>
          <span className="text-xs text-muted-foreground">Alerta</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-destructive/20"></span>
          <span className="text-xs text-muted-foreground">Risco</span>
        </div>
      </div>
      
      {/* Column Headers */}
      <div className="grid grid-cols-4 gap-1 px-2 py-2 bg-muted/50 sticky top-0 z-10">
        <div className="text-center text-xs font-medium text-muted-foreground">Dia</div>
        {months.map((month, index) => (
          <div 
            key={month} 
            className={cn(
              "text-center text-xs font-semibold",
              index === 0 ? "text-primary" : "text-muted-foreground"
            )}
          >
            {month}
          </div>
        ))}
      </div>
      
      {/* Data Grid */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border/50">
          {data.map((row) => (
            <div 
              key={row.day} 
              className={cn(
                "grid grid-cols-4 gap-1 px-2 py-1",
                row.day === today && "bg-primary/5"
              )}
            >
              {/* Day Number */}
              <div className={cn(
                "flex items-center justify-center",
                row.day === today && "font-bold text-primary"
              )}>
                <span className="text-sm">{row.day}</span>
              </div>
              
              {/* Month Columns */}
              {row.months.map((monthData, index) => (
                <div 
                  key={index}
                  className={cn(
                    "text-center py-1.5 px-1 rounded text-xs font-medium transition-colors",
                    getHeatmapColor(monthData.risk, monthData.balance)
                  )}
                >
                  {formatCurrency(monthData.balance)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Footer Summary */}
      <div className="border-t border-border p-3 bg-card">
        <div className="grid grid-cols-3 gap-2 text-center">
          {months.map((month, index) => {
            const lastDay = data[data.length - 1]
            const balance = lastDay.months[index].balance
            return (
              <div key={month} className="flex flex-col">
                <span className="text-xs text-muted-foreground">Final {month}</span>
                <span className={cn(
                  "text-sm font-bold",
                  balance >= 0 ? "text-success" : "text-destructive"
                )}>
                  R$ {formatCurrency(balance)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
