import { categories } from "../data/categories";
import { type DraftExpense, type Expense } from '../types/types';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  })

  const [error, setError] = useState('')
  const { dispatch } = useBudget();

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target; // destructuring
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).some(value => !value)) {
      setError('Todos los campos son obligatorios')
      return;
    }
    dispatch({
      type: 'ADD_EXPENSE',
      payload: { expense }
    })
    setExpense({
      amount: '',
      expenseName: '',
      category: '',
      date: new Date()
    })
    setError('');

  }


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
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
        value="Agregar Gasto"
        className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer uppercase font-bold w-full p-2 text-white rounded-lg" />

    </form>
  )
}
