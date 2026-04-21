"use client"

import { useState } from "react"
import { X, ArrowUpRight, ArrowDownRight, CreditCard, TrendingUp, Delete, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TransactionType = "ganho" | "debito" | "credito" | "investimento"

interface AddTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const transactionTypes: { type: TransactionType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: "ganho", label: "Ganho", icon: <ArrowUpRight className="h-5 w-5" />, color: "bg-success text-success-foreground" },
  { type: "debito", label: "Débito", icon: <ArrowDownRight className="h-5 w-5" />, color: "bg-destructive text-destructive-foreground" },
  { type: "credito", label: "Crédito", icon: <CreditCard className="h-5 w-5" />, color: "bg-warning text-warning-foreground" },
  { type: "investimento", label: "Investimento", icon: <TrendingUp className="h-5 w-5" />, color: "bg-primary text-primary-foreground" },
]

const numpadKeys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "del"],
]

export function AddTransactionModal({ open, onOpenChange }: AddTransactionModalProps) {
  const [selectedType, setSelectedType] = useState<TransactionType>("debito")
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  
  const handleNumpadPress = (key: string) => {
    if (key === "del") {
      setValue(prev => prev.slice(0, -1))
    } else if (key === ".") {
      if (!value.includes(".")) {
        setValue(prev => prev + key)
      }
    } else {
      // Limit to 2 decimal places
      const parts = value.split(".")
      if (parts.length === 2 && parts[1].length >= 2) return
      setValue(prev => prev + key)
    }
  }
  
  const formatDisplayValue = () => {
    if (!value) return "R$ 0,00"
    const numValue = parseFloat(value) || 0
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue)
  }
  
  const handleSubmit = () => {
    // Here you would save the transaction
    console.log({ type: selectedType, value: parseFloat(value), description, dueDate })
    // Reset form
    setValue("")
    setDescription("")
    setDueDate("")
    onOpenChange(false)
  }
  
  const getTypeColor = () => {
    switch (selectedType) {
      case "ganho": return "text-success"
      case "debito": return "text-destructive"
      case "credito": return "text-warning"
      case "investimento": return "text-primary"
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 max-h-[90vh] overflow-auto">
        <DialogHeader className="p-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Nova Transação</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Transaction Type Selector */}
        <div className="p-4 border-b border-border">
          <div className="grid grid-cols-4 gap-2">
            {transactionTypes.map(({ type, label, icon, color }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg transition-all",
                  selectedType === type 
                    ? cn(color, "shadow-md scale-105")
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {icon}
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Value Display */}
        <div className="p-6 text-center border-b border-border bg-secondary/30">
          <p className={cn("text-3xl font-bold", getTypeColor())}>
            {formatDisplayValue()}
          </p>
        </div>
        
        {/* Description Input */}
        <div className="p-4 border-b border-border">
          <Input
            placeholder="Descrição (ex: Aluguel, Salário...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-center"
          />
        </div>
        
        {/* Due Date for Credit */}
        {selectedType === "credito" && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="Data de vencimento"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        )}
        
        {/* Numpad */}
        <div className="p-3 bg-muted/30">
          <div className="grid grid-cols-3 gap-2">
            {numpadKeys.flat().map((key) => (
              <button
                key={key}
                onClick={() => handleNumpadPress(key)}
                className={cn(
                  "h-14 rounded-lg font-semibold text-xl transition-all active:scale-95",
                  key === "del" 
                    ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    : "bg-card text-foreground hover:bg-secondary shadow-sm"
                )}
              >
                {key === "del" ? <Delete className="h-5 w-5 mx-auto" /> : key}
              </button>
            ))}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="p-4 border-t border-border">
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold"
            disabled={!value || parseFloat(value) <= 0}
          >
            Adicionar {transactionTypes.find(t => t.type === selectedType)?.label}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
