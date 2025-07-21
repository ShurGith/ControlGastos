import { formatCurrency } from "../helpers"


type AmountDiplayProps = {
    amount: number
    label?: string
}
function AmountDisplay({label, amount}:AmountDiplayProps) {
  return (
    <div>
        <p className="text-2xl text-blue-600 font-bold">
            {label && `${label}: `} 
            <span className="font-black text-black">{formatCurrency(amount)}</span>
        </p>
    </div>
  )
}

export default AmountDisplay