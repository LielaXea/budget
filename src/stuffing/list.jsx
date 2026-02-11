export default function Listful({ transactions, onDelete, onEdit, allCategories }) {
  const getCategoryById = (id) => {
    return allCategories.find(c => c.id === id) || { name: 'Unknown', color: '#gray', type: 'Unknown'}
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Transactions ({transactions.length})</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
      <ul className="space-y-2">
        {transactions.map((t) => {
          const category = getCategoryById(t.categoryId)
            return (
              <li
                key={t.id}
                className="flex justify-between items-center border-b hover:bg-gray-50 pb-2 rounded"
              >
                <div className="flex items-center gap-3 flex-1">
                  { /* Category color badge */}
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color}}
                    title={category.name}
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.description}</span>
                      { /* Category Badge */}
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${category.color}20`,
                          color: category.color
                        }}
                      >
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(t.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={t.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onEdit(t)}
                    className="text-blue-500 hover:text-blue-700 px-2"
                  >
                    Edit 
                  </button>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    Delete 
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
