import { categories } from "../data/categories";
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function ExpenseForm() {
  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName"
          className="text-xl">Nombre del gasto:</label>
        <input type="text"
          id='expenseName'
          name="expenseName"
          placeholder='Añade el Nombre del Gasto'
          className="bg-slate-100 p-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount"
          className="text-xl">Cantidad:</label>
        <input type="number"
          id='amount'
          name="amount"
          placeholder='Cantidad Gastada, Ej. 300'
          className="bg-slate-100 p-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category"
          className="text-xl">Categorias:</label>
        <select
          id='category'
          name="category"
          className="bg-slate-100 p-2">
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount"
            className="text-xl">Fecha:</label>
          <DatePicker 
          onChange={() => { }} value={null}
          className="bg-slate-100 p-2 border-0" />
        </div>
      </div>
      <input type="submit"
        value="Agregar Gasto"
        className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer uppercase font-bold w-full p-2 text-white rounded-lg" />

    </form>
  )
}
