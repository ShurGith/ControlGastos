import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
    const { state } = useBudget();
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
    const isEmpty = useMemo(() => !filteredExpenses.length, [filteredExpenses]);

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10 ">
            {isEmpty ? <p className="text-gray-500 text-2xl font-bold">No hay gastos</p>
                : (
                    <>
                        <h2 className="mb-4 text-gray-600 text-2xl font-bold">Lista de Gastos</h2>

                        {filteredExpenses.map((expense) => (
                            <ExpenseDetail key={expense.id} expense={expense}/>
                        ))}
                    </>
                ) 
            }
        </div>
    );
}
export default ExpenseList