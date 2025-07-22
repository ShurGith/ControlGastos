import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AmountDisplay from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"


function BudgetTracker() {
    const {state,totalExpenses,remainingBalance, dispatch} = useBudget()
    const porcentaje: number =  +(( totalExpenses/state.budget)*100).toFixed(2)
    const minOne =  remainingBalance > state.budget * .5 
    const minTwo = remainingBalance > state.budget * .2 && !minOne
    const graphColor : string = minOne ? '#4caf50' : minTwo ? '#3b82ff' : '#f44336'
    const trailColor : string = minOne ? '#7ed788be' : minTwo ? '#6da2fd81' : '#f1766d'
    

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
        <div className="flex justify-center">
            <CircularProgressbar 
            value={porcentaje} 
            styles={buildStyles({
                    pathColor: graphColor,
                    textColor: graphColor,
                    trailColor: trailColor,
                    textSize: 10,
                    pathTransitionDuration: 2,
                    strokeLinecap: 'butt',
                })}
                text={`${porcentaje}% Gastado`}
                />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
            <button 
            className="bg-pink-400 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
            onClick={()=>dispatch({type:'RESSET_APP'})}
            >
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