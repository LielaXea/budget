import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from 'recharts'

export default function SpendingByCategory({ transactions, categories }) {
  const data = categories.map(cat => {
    const total = transactions 
      .filter(t => t.categoryId === cat.id)
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      name: cat.name,
      value: total,
      color: cat.color
    }
  }).filter(d => d.value > 0)

  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (data.length === 0){
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
        <p className="text-gray-500 text-center py-8">No expense data yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-gray-600">
        <p className="font-semibold">Total Expenses: ${total.toFixed(2)}</p>
      </div>
    </div>
  )
}
