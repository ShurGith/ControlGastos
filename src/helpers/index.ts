export function formatCurrency(amount: number, currency = 'USD') {
  return (
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
      amount)
  )
}

export const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr === '') return ''
  const dateObj = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  } 
  return dateObj.toLocaleDateString('es-ES',options)
} 