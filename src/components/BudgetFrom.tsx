import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
export default function BudgetFrom() {
    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBudget(e.target.valueAsNumber)
    }
    const isValid = useMemo(() =>{
       return  isNaN(budget) || budget <= 0
    }, [budget])

const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   console.log(budget);
   dispatch({type:'ADD_BUDGET', payload:{budget}});
}

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="font-bold text-4xl text-center text-blue-500">Definir presupuesto</label>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Ingresa tu presupuesto indicando un número positivo"
                name="budget" 
                value={budget} 
                onChange={handleInputChange}
                min="0"
                />

                <input 
                type="submit"
                className={`bg-blue-600 w-full py-3 font-bold uppercase text-white hover:bg-blue-700 cursor-pointer transition-colors duration-150 ease-in-out disabled:opacity-50`}
                disabled={isValid }
                value="Definir Presupuesto"/>
        </div>
    </form>
  )
}
