
export type BudgetActions =
    { type: 'ADD_BUDGET', payload: { badget: number } };

export type BudgetState = {
    budget: number;
};

export const initialState: BudgetState = {
    budget: 0,
};  

export const budgetReducer = (
    state: BudgetState, 
    action: BudgetActions
) => {
    if(action.type === "ADD_BUDGET"){
        return {
            ...state, 
            budget: action.payload.badget
        }
    }
    return state;
}
