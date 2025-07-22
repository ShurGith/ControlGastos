import React, { createContext, useMemo, useReducer } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"



type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses:number
    remainingBalance: number
}


type BudgetProviderProps = {
    children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children } : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)

        const totalExpenses = useMemo(() =>state.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0),[state.expenses])
        const remainingBalance = useMemo(()=> state.budget - totalExpenses,[totalExpenses,state])

    return (
        <BudgetContext.Provider
            value={{
                state, dispatch,
                totalExpenses,remainingBalance
            }}>
            {children}
        </BudgetContext.Provider>
    )
}