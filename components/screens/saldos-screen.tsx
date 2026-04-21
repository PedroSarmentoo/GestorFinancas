"use client"

import { useState, useEffect } from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DayData {
  day: number
  weekDay: string
  spent: number
  balance: number
  validated: boolean
}

// Seeded random number generator for consistent data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate mock data for the month with deterministic values
function generateMonthData(year: number, month: number, todayDay: number, todayMonth: number): DayData[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  const data: DayData[] = []
  
  let runningBalance = 5000 // Starting balance
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const seed = year * 10000 + month * 100 + day
    const rand1 = seededRandom(seed)
    const rand2 = seededRandom(seed + 1)
    const spent = rand1 > 0.3 ? Math.floor(rand2 * 300) + 20 : 0
    runningBalance -= spent
    
    // Add income on day 5 and 20
    if (day === 5 || day === 20) {
      runningBalance += 2500
    }
    
    data.push({
      day,
      weekDay: weekDays[date.getDay()],
      spent,
      balance: runningBalance,
      validated: day < todayDay && month === todayMonth
    })
  }
  
  return data
}

export function SaldosScreen() {
  const [mounted, setMounted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(3) // April (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026)
  const [todayInfo, setTodayInfo] = useState({ day: 4, month: 3, year: 2026 })
  const [dayData, setDayData] = useState<DayData[]>([])
  
  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    setTodayInfo({ day, month, year })
    setCurrentMonth(month)
    setCurrentYear(year)
    setDayData(generateMonthData(year, month, day, month))
    setMounted(true)
  }, [])
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
      setDayData(generateMonthData(currentYear - 1, 11, todayInfo.day, todayInfo.month))
    } else {
      setCurrentMonth(m => m - 1)
      setDayData(generateMonthData(currentYear, currentMonth - 1, todayInfo.day, todayInfo.month))
    }
  }
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
      setDayData(generateMonthData(currentYear + 1, 0, todayInfo.day, todayInfo.month))
    } else {
      setCurrentMonth(m => m + 1)
      setDayData(generateMonthData(currentYear, currentMonth + 1, todayInfo.day, todayInfo.month))
    }
  }
  
  const toggleValidated = (index: number) => {
    setDayData(prev => prev.map((d, i) => 
      i === index ? { ...d, validated: !d.validated } : d
    ))
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  const isToday = (day: number) => {
    return day === todayInfo.day && 
           currentMonth === todayInfo.month && 
           currentYear === todayInfo.year
  }
  
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={handlePreviousMonth}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button 
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      
      {/* Column Headers */}
      <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border bg-secondary/50">
        <div className="w-8"></div>
        <div>Dia</div>
        <div className="text-right">Gasto</div>
        <div className="text-right">Saldo</div>
      </div>
      
      {/* Day List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {dayData.map((data, index) => (
            <div
              key={data.day}
              className={cn(
                "grid grid-cols-[auto_1fr_1fr_1fr] gap-2 px-4 py-3 items-center transition-colors",
                isToday(data.day) && "bg-primary/10 border-l-4 border-l-primary",
                !isToday(data.day) && "hover:bg-secondary/50"
              )}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleValidated(index)}
                className={cn(
                  "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                  data.validated 
                    ? "bg-success border-success text-success-foreground" 
                    : "border-border hover:border-muted-foreground"
                )}
                aria-label={data.validated ? "Marcar como não validado" : "Marcar como validado"}
              >
                {data.validated && <Check className="h-4 w-4" />}
              </button>
              
              {/* Day */}
              <div className="flex flex-col">
                <span className={cn(
                  "font-semibold text-sm",
                  isToday(data.day) && "text-primary"
                )}>
                  {data.day}
                </span>
                <span className="text-xs text-muted-foreground">
                  {data.weekDay}
                </span>
              </div>
              
              {/* Spent */}
              <div className="text-right">
                {data.spent > 0 ? (
                  <span className="text-sm font-medium text-destructive">
                    -{formatCurrency(data.spent)}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </div>
              
              {/* Balance */}
              <div className={cn(
                "text-right py-1 px-2 rounded-md",
                data.balance >= 0 ? "bg-success-light" : "bg-danger-light"
              )}>
                <span className={cn(
                  "text-sm font-semibold",
                  data.balance >= 0 ? "text-success" : "text-destructive"
                )}>
                  {formatCurrency(data.balance)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
