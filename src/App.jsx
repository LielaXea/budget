import { useState } from 'react'
import Formful from './stuffing/form'
import Listful from './stuffing/list'
import Dashful from './stuffing/dash'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
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
