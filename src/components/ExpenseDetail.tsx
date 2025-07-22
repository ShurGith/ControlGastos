import { Expense } from "../types";
import {formatDate} from "../helpers"
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { categories} from "../data/categories" 

type ExpenseDetailProps = {
  expense: Expense
}
export default function ExpenseDetail({expense} : ExpenseDetailProps) {
  const categoryInfo = useMemo(() => (categories.filter( cat => cat.id === expense.category)[0]),[expense]);

return(
    <div className="bg-white shadow-lg p-10 border-b border-gray-200 flex items-center gap-5"
        key={expense.id}>
        <div>
          <img src={`/icono_${categoryInfo.icon}.svg`} alt={`Icono de ${categoryInfo.name}`} width="64px"/>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-xl font-semibold text-slate-500">{categoryInfo.name}</p>
      <h3>{expense.expenseName}</h3>
      <p>{formatDate(expense.date!.toString())}</p>
      </div>
      <AmountDisplay amount={expense.amount}/>
    
    </div>
  )
}
