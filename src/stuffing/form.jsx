import { useState, useEffect } from 'react'

export default function Formful({ onAdd, editingTransaction, onUpdate, incomeCategories, expenseCategories }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [categoryId, setCategoryId] = useState('')

  const currentCategories = type === 'income' ? incomeCategories : expenseCategories

  useEffect(() => {
    if (editingTransaction){
      setDescription(editingTransaction.description)
      setAmount(editingTransaction.amount)
      setType(editingTransaction.type)
      setCategoryId(editingTransaction.categoryId)
    }
  },[editingTransaction])

  useEffect(() => {
    if (!editingTransaction) {
      setCategoryId(currentCategories[0]?.id || '')
    }
  }, [type, currentCategories, editingTransaction])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      description,
      amount: parseFloat(amount),
      type,
      categoryId: parseInt(categoryId),
      date: new Date().toISOString()
    }

    if (editingTransaction) {
      onUpdate(editingTransaction.id, data)
    } else {
      onAdd({...data, id: Date.now()})
    }
    setDescription('')
    setAmount('')
    setType('expense')
    setCategoryId(expenseCategories[0]?.id || '')
  }

  
  return (
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols4 gap-3">
      <select 
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 rounded font-semibold"
      >
        <option value="expense">💸 Expense</option>
        <option value="income">💰 Income</option>
      </select>

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
      step="0.01"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="border p-2 rounded"
      required
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {currentCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      </div>
      <button 
      type="submit"
      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        {editingTransaction ? 'Update' : ' Add'} Transaction
      </button>
      </form>
  )
}
