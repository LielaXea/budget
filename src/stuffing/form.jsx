import { useState } from 'react'

export default function Formful({ onAdd }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      description,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString()
    })
    setDescription('')
    setAmount('')
  }
  
  return (
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border p-2 rounded"
      required
      />
      <input 
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="border p-2 rounded"
      required
      />
      <select 
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 rounded"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      </div>
      <button 
      type="submit"
      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
      </form>
  )
}
