"use client"

import { TrendingUp, TrendingDown, Wallet, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Mock data
const dashboardData = {
  performance: 1250.00,
  percentSaved: 18.5,
  costOfLiving: 4750.00,
  dailyAverage: 158.33,
  entries: [
    { id: 1, description: "Salário", value: 5000.00, date: "05/04" },
    { id: 2, description: "Freelance", value: 1500.00, date: "12/04" },
    { id: 3, description: "Rendimentos", value: 85.50, date: "15/04" },
  ],
  exits: [
    { id: 1, description: "Aluguel", value: 1800.00, date: "10/04" },
    { id: 2, description: "Mercado", value: 650.00, date: "08/04" },
    { id: 3, description: "Luz", value: 180.00, date: "15/04" },
    { id: 4, description: "Internet", value: 120.00, date: "05/04" },
    { id: 5, description: "Transporte", value: 450.00, date: "20/04" },
  ],
  totalEntries: 6585.50,
  totalExits: 5335.50,
}

export function TotaisScreen() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }
  
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4 pb-24">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Abril 2026</p>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        
        {/* Performance Card */}
        <Card className="border-0 bg-gradient-to-br from-success/10 to-success/5 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Performance</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(dashboardData.performance)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Sobrando este mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* % Economizado */}
          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Economizado</span>
              </div>
              <p className="text-xl font-bold text-foreground mb-2">
                {dashboardData.percentSaved}%
              </p>
              <Progress value={dashboardData.percentSaved} className="h-2" />
            </CardContent>
          </Card>
          
          {/* Custo de Vida */}
          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-xs text-muted-foreground">Custo de Vida</span>
              </div>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(dashboardData.costOfLiving)}
              </p>
            </CardContent>
          </Card>
          
          {/* Diário Médio */}
          <Card className="border shadow-sm col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-warning-light flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Diário Médio</span>
                    <p className="text-xl font-bold text-foreground">
                      {formatCurrency(dashboardData.dailyAverage)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">por dia</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Movimentações */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Movimentações do Mês</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {/* Totais */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Entradas</p>
                  <p className="text-sm font-semibold text-success">
                    {formatCurrency(dashboardData.totalEntries)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Saídas</p>
                  <p className="text-sm font-semibold text-destructive">
                    {formatCurrency(dashboardData.totalExits)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Entradas List */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Entradas
              </h4>
              <div className="space-y-2">
                {dashboardData.entries.map(entry => (
                  <div key={entry.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">{entry.description}</span>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <span className="text-sm font-medium text-success">
                      +{formatCurrency(entry.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Saídas List */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive"></span>
                Principais Saídas
              </h4>
              <div className="space-y-2">
                {dashboardData.exits.map(exit => (
                  <div key={exit.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">{exit.description}</span>
                      <span className="text-xs text-muted-foreground">{exit.date}</span>
                    </div>
                    <span className="text-sm font-medium text-destructive">
                      -{formatCurrency(exit.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
