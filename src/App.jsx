import { useState, useEffect } from 'react'
import Formful from './stuffing/form'
import Listful from './stuffing/list'
import Dashful from './stuffing/dash'
import Filterful from './stuffing/filters'
import Categoriful from './stuffing/categories'

function App() {

  const [incomeCategories, setIncomeCategories] = useState(() => {
    const saved = localStorage.getItem('incomeCategories')
    return saved ? JSON.parse(saved) : [
      { id: 101, name: 'Salary', color: '#10b981', type: 'income'},
      { id: 102, name: 'Freelance', color: '#059669', type: 'income'},
      { id: 103, name: 'Investments', color: '#34d399', type: 'income'},
      { id: 104, name: 'Side Hustle', color: '#6ee7b7', type: 'income'},
      { id: 105, name: 'Gifts', color: '#a7f3d0', type: 'income'},
      { id: 106, name: 'Other Income', color: '#6b7290', type: 'income'}
    ]
  })

  const [expenseCategories, setExpenseCategories] = useState(() => {
    const saved = localStorage.getItem('expenseCategories')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Food', color: '#ef4444', type: 'expense'},
      { id: 2, name: 'Transport', color: '#f59e0b', type: 'expense'},
      { id: 3, name: 'Bills', color: '#8b5cf6', type: 'expense'},
      { id: 4, name: 'Entertainment', color: '#ec4899', type: 'expense'},
      { id: 5, name: 'Shopping', color: '#06b6d4', type: 'expense'},
      { id: 6, name: 'Health', color: '#14b8a6', type: 'expense'},
      { id: 7, name: 'Education', color: '#3b82f6', type: 'expense'},
      { id: 8, name: 'Other', color: '#6b7280', type: 'expense'}
    ]
  })

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })

  const [editingId, setEditingId] = useState(null)

  const [showCategoryManager, setShowCategoryManager] = useState(false)

  const allCategories = [...incomeCategories, ...expenseCategories]

  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  })

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories))
  }, [incomeCategories])

  useEffect(() => {
    localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories))
  }, [expenseCategories])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, {...transaction, id: Date.now()}])
  }

  const deleteTransaction = (id) => {
    if (confirm('Delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id))
    }
  }

  const updateTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t =>
    t.id === id ? {...t, ...updatedData} : t
    ))
    setEditingId(null)
  }

  const filteredTransactions = transactions.filter(t => {
    if (filters.category !== 'all' && t.categoryId !== parseInt(filters.category)) return false
    if (filters.type !== 'all' && t.type !== filters.type) return false
    if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.dateFrom && new Date(t.date) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(t.date) > new Date(filters.dateTo)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Budgetium Trackius</h1>
          <button
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            {showCategoryManager ? 'Hide' : 'Manage'} Categories
          </button>
        </div>

        {showCategoryManager && (
          <Categoriful
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            setIncomeCategories={setIncomeCategories}
            setExpenseCategories={setExpenseCategories}
          />
        )}

        <Dashful transactions={filteredTransactions} />

        <Formful
          onAdd={addTransaction}
          editingTransaction={editingId ? transactions.find(t => t.id === editingId) : null}
          onUpdate={updateTransaction}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
        />

        <Filterful
          filters={filters}
          setFilters={setFilters}
          allCategories={allCategories}
        />

        <Listful
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onEdit={(transaction) => setEditingId(transaction.id)}
          allCategories={allCategories}
        />
      </div>
    </div>
  )
}

export default App
