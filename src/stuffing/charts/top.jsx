import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from 'recharts'

export default function TopExpenses({ transactions, categories }) {
  const topExpenses = transactions
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10)
    .map(t => {
      const category = categories.find(c => c.id === t.categoryId)
      return {
        name: t.description.length > 20 ? t.description.substring(0,20) + '...' : t.description,
        amount: t.amount,
        color: category?.color || '#6b7280',
        date: new Date(t.date).toLocaleDateString()
    }
  })

  if (topExpenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Top 10 Expenses</h3>
        <p className="text-gray-500 text-center py-8">No expense data yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Top 10 Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topExpenses} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip
            formatter={(value) => `${value.toFixed(2)}`}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return `${payload[0].payload.name} (${payload[0].payload.date})`
              }
              return label
            }}
          />
          <Bar dataKey="amount" name="Amount">
            {topExpenses.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-gray-600">
        <p className="text-sm">
          Largest: <span className="font-bold text-red-600">${topExpenses[0].amount.toFixed(2)}</span> ({topExpenses[0].name})
        </p>
      </div>
    </div>
  )
}
