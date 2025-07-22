import { categories } from "../data/categories";
import type { DraftExpense, Value } from '../types';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import { Icon } from "@iconify/react";

export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  })

  const [error, setError] = useState('')
  const [previousAmout, setPreviousAamount] = useState(0);
  const { dispatch, state, remainingBalance } = useBudget();

  const validateAmount = (valor: number) => {
      if (valor - previousAmout > remainingBalance) {
      setError(`La cantidad supera el presupuesto`);
      return;
    }else{
        setError('');
    }
  }

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0];
      setExpense(editingExpense);
      setPreviousAamount(editingExpense.amount);
    }
  }, [state.editingId])

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target; // destructuring
    const isAmountField = ['amount'].includes(name)

    //Validar que la cantidad no sea mayor al presupuesto
    validateAmount(+value);
  
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })

  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validar que todos los campos esten llenos
    if (Object.values(expense).some(value => !value)) {
      setError('Todos los campos son obligatorios')
      return;
    }

    //Validar que la cantidad no sea mayor al presupuesto
    validateAmount(expense.amount);
 /*    if (expense.amount - previousAmout > remainingBalance) {
      setError(`La cantidad supera el presupuesto`);
      return;
    } */

    //Añadir o actualizar un gasto
    if (state.editingId)
      dispatch({ type: 'UPDATE_EXPENSE', payload: { expense: { ...expense, id: state.editingId } } })
    else
      dispatch({ type: 'ADD_EXPENSE', payload: { expense } })

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })
    setError('');
  }

  const Icono = state.editingId ? "flowbite:edit-outline" : "mingcute:file-new-fill";
  const Fondo = state.editingId ? "bg-blue-500" : "bg-green-600";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className={`${Fondo} uppercase text-center text-2xl font-black border-b-4 py-2 flex justify-center items-center gap-8 mb-8 text-white`}>
        <Icon icon={Icono} width="48" height="48" style={{ color: '#fff' }} />
        {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName"
          className="text-xl">Nombre del gasto:</label>
        <input type="text"
          id='expenseName'
          name="expenseName"
          placeholder='Añade el Nombre del Gasto'
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleChange} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount"
          className="text-xl">Cantidad:</label>
        <input type="number"
          id='amount'
          name="amount"
          placeholder='Cantidad Gastada, Ej. 300'
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category"
          className="text-xl">Categorias:</label>
        <select
          id='category'
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
          <label htmlFor="Fecha"
            className="text-xl">Fecha:</label>
          <DatePicker
            onChange={handleChangeDate}
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
          />
        </div>
      </div>
      <input type="submit"
        value={state.editingId ? "Actualizar Gasto" : "Añadir Gasto"}
        className={`${Fondo} cursor-pointer uppercase font-bold w-full p-2 text-white rounded-lg`} />
    </form>
  )
}
