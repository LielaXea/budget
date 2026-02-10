import { useState, useEffect } from 'react'
import Formful from './stuffing/form'
import Listful from './stuffing/list'
import Dashful from './stuffing/dash'

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })

  const [editingId, setEditingId] = useState(null)

  const addTransaction = (transaction) => {
    setTransactions([...transactions, {...transaction, id: Date.now()}])
  }

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const updateTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t =>
    t.id === id ? {...t, ...updatedData} : t
    ))
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Budget </h1>
      <Dashful transactions={transactions} />
      <Formful 
        onAdd={addTransaction}
        editingTransaction={editingId ? transactions.find(t => t.id === editingId) : null}
        onUpdate={updateTransaction}
      />
      <Listful 
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={(transaction) => setEditingId(transaction.id)}
      />
    </div>
  )
}

export default App
