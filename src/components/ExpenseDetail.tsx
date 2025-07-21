import { Expense } from "../types";
import {formatDate} from "../helpers"
import AmountDisplay from "./AmountDisplay";
type ExpenseDetailProps = {
  expense: Expense
}
export default function ExpenseDetail({expense} : ExpenseDetailProps) {

  return (
    <div className="bg-white shadow-lg p-10 border-b border-gray-200 flex items-center gap-5"
        key={expense.id}>
      <h3>{expense.expenseName}</h3>
      <p>{formatDate(expense.date!.toString())}</p>
      <AmountDisplay amount={expense.amount}/>
    
    </div>
  )
}
