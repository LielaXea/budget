import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

export default function MonthlyTrend({ transactions}) {
  const monthlyData = {}

  transactions.forEach(t => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthKey, income: 0, expenses: 0}
    }

    if (t.type === 'income'){
      monthlyData[monthKey].income += t.amount
    } else {
      monthlyData[monthKey].expenses += t.amount
    }
  })

  const data = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(d => ({
      month: new Date(d.month + '-01').toLocaleDateString('en-US', {month: 'short', year: 'numeric'}),
      balance: d.income - d.expenses,
      income: d.income,
      expenses: d.expenses
  }))

  if (data.length === 0) {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Monthly Balance Trend</h3>
          <p className="text-gray-500 text-center py-8">No data yet</p>
        </div>
      )
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Monthly Balance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWdith={2}
            name="Monthly Balance"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <p className="text-gray-600">Best Month</p>
          <p className="font-bold text-green-600">
            ${Math.max(...data.map(d => d.balance)).toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Worst Month</p>
          <p className="font-bold text-red-600">
            ${Math.min(...data.map(d => d.balance)).toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Average</p>
          <p className="font-bold text-blue-600">
            ${data.reduce((sum, d) => sum + d.balance, 0 / data.length).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
