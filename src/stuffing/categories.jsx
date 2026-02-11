import { useState } from 'react'

export default function Categoriful({ incomeCategories, expenseCategories, setIncomeCategories, setExpenseCategories}) {
  const [activeTab, setActiveTab] = useState('expense')
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6'})
  const [editingId, setEditingId] = useState(null)

  const categories = activeTab === 'income' ?  incomeCategories : expenseCategories
  const setCategories = activeTab === 'income' ? setIncomeCategories : setExpenseCategories

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newCategory.name.trim()) return

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCategory.name,
        color: newCategory.color,
        type: activeTab
      }
    ])
    setNewCategory({ name: '', color: activeTab === 'income' ? '#10b981' : '#ef4444'})
  }

  const handleDelete = (id) => {
    if (confirm('Delete this category? Transactions will keep their category ID.')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
  }

  const handleUpdate = (id, updates) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, ...updates} : c
    ))
    setEditingId(null)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'expense'
            ? 'border-red-500 text-red-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          💸 Expense Categories 
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
          activeTab === 'income'
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          💰 Income Categories 
        </button>
      </div>

      <form onSubmit={handleAdd} className="mb-6 pb-6 border-b">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder={`New ${activeTab} category name`}
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            className="flex-1 border-b p-2 rounded"
            required
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
            className="w-16 h-10 border rounded cursor-pointer"
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded text-white ${
              activeTab === 'income'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Add Category 
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No {activeTab} categories yet. Add one above!
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
            >
              {editingId === category.id ? (
                <div className="flex gap-3 flex-1">
                  <input
                    type="text"
                    defaultValue={category.name}
                    className="flex-1 border p-2 rounded"
                    onBlur={(e) => handleUpdate(category.id, {name: e.target.value})}
                    autoFocus
                  />
                  <input
                    type="color"
                    defaultValue={category.color}
                    onChange={(e) => handleUpdate(category.id, {color: e.target.value})}
                    className="w-16 h-10 border rounder cursor-pointer"
                  />
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Done
                  </button>
                </div>
              ) : (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: category.color}}
                  />
                  <span className="font-semibold">{category.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500 hover:text-red-700 px-3 py-1"
                  >
                    Delete 
                  </button>
                </div>
              </>
              )}
            </div>
          ))
        )}
    </div>

    <div className="mt-6 pt-6 border-t flex justify-around text-sm text-gray-600">
      <div>
        <span className="font-semibold">{expenseCategories.length}</span> expense categories
      </div>
      <div>
        <span className="font-semibold">{incomeCategories.length}</span> income categories
      </div>
    </div>
  </div>
  )
}
