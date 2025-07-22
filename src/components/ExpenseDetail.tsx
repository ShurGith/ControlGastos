import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';


import { type Expense } from "../types";
import { formatDate } from "../helpers"
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { categories } from "../data/categories"
import { useBudget } from '../hooks/useBudget';

type ExpenseDetailProps = {
  expense: Expense
}
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();

  const editActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'EDITING_ID', payload: {id: expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const deleteActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={false}
        onClick={() =>dispatch({
          type: 'REMOVE_EXPENSE',
          payload: { id: expense.id }
        })}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const categoryInfo = useMemo(() => (categories.filter(cat => cat.id === expense.category)[0]), [expense]);

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={editActions()}
        trailingActions={deleteActions()}
      >
        <div className="bg-white shadow-sm shadow-slate-100 rounded-lg p-5 border-b border-gray-200  mb-1 flex items-center gap-8 cursor-move w-full"
          key={expense.id}>
          <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt={`Icono de ${categoryInfo.name}`} width="64px" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500 select-none ">{categoryInfo.name}</p>
            <h3 className='select-none '>{expense.expenseName}</h3>
            <p className='select-none '>{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay amount={expense.amount} />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
