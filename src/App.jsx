import { useState } from 'react'
import Formful from './stuffing/form'
import Listful from './stuffing/list'
import Dashful from './stuffing/dash'

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Salary',
      amount: 3000,
      type: 'income',
      date: new Date().toISOString()
    },
    {
      id: 2,
      description: 'Groceries',
      amount: 150,
      type: 'expense',
      date: new Date().toISOString()
    },
    {
      id: 3,
      description: 'Rent',
      amount: 1200,
      type: 'expense',
      date: new Date().toISOString()
    }
  ])

  const addTransaction = (id) => {
    setTransactions([...transactions, {...transaction, id: Date.now()}])
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Budget </h1>
      <Dashful transactions={transactions} />
      <Formful onAdd={addTransaction} />
      <Listful transactions={transactions} onDelete={deleteTransaction} />
    </div>
  )
}

export default App
