import AmountDisplay from "./AmountDisplay"

function BudgetTracker() {
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
                amount={300}           
             />
            <AmountDisplay 
                label="Disponible"
                amount={200}           
             />
            <AmountDisplay 
                label="Gastado"
                amount={100}           
             />
        </div>

    </div>
  )
}

export default BudgetTracker