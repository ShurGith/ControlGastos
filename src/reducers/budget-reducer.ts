
export type BudgetActions =
    { type: 'ADD_BUDGET', payload: { budget: number } } |
    { type: 'SHOW_MODAL'}|
    {type:'CLOSE_MODAL'};

export type BudgetState = {
    budget: number;
};

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
};  

export const budgetReducer = (
    state: BudgetState, 
    action: BudgetActions
) => {
    if(action.type === "ADD_BUDGET"){
        return {
            ...state, 
            budget: action.payload.budget
        }
    }
    if(action.type === "SHOW_MODAL"){
        return{
            ...state,
            modal:true
        };
    }
    if(action.type === "CLOSE_MODAL"){
        return{
            ...state,
            modal:false
        };
    }
    return state;
}
