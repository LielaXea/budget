import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

export default function IncomeVsExpenses({ transactions }) {
  const monthlyData = {}

  transactions.forEach(t => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0}
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount
    } else {
      monthlyData[monthKey].expenses += t.amount
    }
  })

  const data = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(d => ({
      ...d,
      month: new Date(d.month + '-01').toLocaleDateString('en-US', {month: 'short', year: 'numeric'})
  }))

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Income vs Expenses</h3>
        <p className="text-gray-500 text-center py-8">No data yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Income"/>
          <Bar dataKey="expenses" fill="#ef4444" name="Expenses"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
