export default function Dashful({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum,t) => sum + t.amount, 0)

  const balance = income - expenses

  return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-green-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800">Income</h3>
        <p className="text-3xl font-bold text-green-600">${income.toFixed(2)}</p>
      </div>
      <div className="bg-red-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800">Expenses</h3>
        <p className="text-3xl font-bold text-red-600">${expenses.toFixed(2)}</p>
      </div>
      <div className="bg-blue-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">Balance</h3>
        <p className="text-3xl font-bold text-blue-600">${balance.toFixed(2)}</p>
      </div>
    </div>
  )
}
