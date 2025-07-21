import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
    const { state } = useBudget();
    const isEmpty = useMemo(() => !state.expenses.length, [state.expenses]);

    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-gray-500 text-2xl font-bold">No hay gastos</p>
                : (
                    <>
                        <h2 className="text-center text-xl font-bold">Lista de Gastos</h2>

                        {state.expenses.map((expense) => (
                            <ExpenseDetail key={expense.id} expense={expense}/>
                        ))}
                    </>
                ) 
            }
        </div>
    );
}
export default ExpenseList