export default function Listful({ transactions, onDelete, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
      <ul className="space-y-2">
      {transactions.map((t) => (
      <li
        key={t.id}
        className="flex justify-between items-center border-b pb-2"
        >
         <div>
          <span className="font-semibold">{t.description}</span>
          <span className="text-sm text-gray-500 ml-2">
            {new Date(t.date).toLocaleDateString()}
          </span>
          </div>
          <div className="flex items-center gap-4">
            <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
            </span>
            <button
              onClick={() => onDelete(t.id)}
              className="text-red-500 hover:text-red-700"
              >
                Delete
                </button>
            <button 
              onClick={() => onEdit(t)}
              className="text-blue-500 hover:text-blue-700"
              >
                Edit
                </button>
          </div>
        </li>
        ))}
        </ul>
      )}
      </div>
  )
}
