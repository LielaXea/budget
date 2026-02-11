import SpendingByCategory from './charts/sbc'
import IncomeVsExpenses from './charts/ive'
import MonthlyTrend from './charts/monthly'
import TopExpenses from './charts/top'

export default function Analysisful({ transactions, allCategories}) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0

  const expenseTransactions = transactions.filter(t => t.type === 'expense')

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">
          Showing insights from {transactions.length} transactions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-green-800 font-semibold">Total Income</p>
          <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-red-800 font-semibold">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`p-6 rounded-lg border-l-4 ${balance >= 0 ? 'bg-blue-50 border-blue-500' : 'bg-orange-50 border-orange-500'}`}>
          <p className={`text-sm font-semibold ${balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Net Balance</p>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            ${Math.abs(balance).toFixed(2)}
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-purple-800 font-semibold">Savings Rate</p>
          <p className="text-3xl font-bold text-purple-600">{savingsRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingByCategory
          transactions={expenseTransactions}
          categories={allCategories.filter(c => c.type === 'expense')}
        />
        <IncomeVsExpenses transactions={transactions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrend transactions={transactions} />
        <TopExpenses
          transactions={expenseTransactions}
          categories={allCategories}
        />
      </div>
    </div>
  )
}
