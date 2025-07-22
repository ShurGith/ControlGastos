import AmountDisplay from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"


function BudgetTracker() {
    const {state,totalExpenses,remainingBalance} = useBudget()
    
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="Grafico de gastos" />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
            <button className="bg-pink-400 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer">
                Resetear App
            </button>
            <AmountDisplay 
                label="Presupuesto"
                amount={state.budget}           
             />
            <AmountDisplay 
                label="Disponible"
                amount={remainingBalance}           
             />
            <AmountDisplay 
                label="Gastado"
                amount={totalExpenses}           
             />
        </div>

    </div>
  )
}

export default BudgetTracker