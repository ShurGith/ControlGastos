import type { ChangeEvent } from "react";
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"


function FitlerByCategory() {
    const { dispatch } = useBudget();
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch({
          type:'FILTER_CATEGORY',
          payload:{id: e.target.value}
      })
    }

  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category" className="text-gray-700 font-bold">Filtar Gastos</label>
                <select id="category"
                className="bg-slate-100 p-3 flex rounded"
                onChange={handleChange}
                >
                    <option value="">-- Todas las Categorías</option>
                    {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
        </form>
    </div>
  )
}

export default FitlerByCategory