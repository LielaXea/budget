export default function Filterful({ filters, setFilters, allCategories}) {
  const handleFilterChange = (key, value) => {
    setFilters({...filters, [key]: value})
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      type: 'all',
      dateFrom: '',
      dateTo: '',
      search: ''
    })
  }

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.search

  const incomeCategories = allCategories.filter(c => c.type === 'income')
  const expenseCategories = allCategories.filter(c => c.type === 'expense')

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Search */}
      <input 
        type="text"
        placeholder="Search description..."
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
        className="border p-2 rounded"
      />

      {/* Category filtering */}
      <select 
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All Categories</option>
          <optgroup label="💰 Income">
            {incomeCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
        ))}
          </optgroup>
          <optgroup label="💸 Expenses">
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </optgroup>
      </select>

      {/* Type filtering */}
      <select
        value={filters.type}
        onChange={(e) => handleFilterChange('type', e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All Types</option>
        <option value="income">💰 Income</option>
        <option value="expense">💸 Expenses</option>
      </select>

      {/* Date from */}
      <input
        type="date"
        value={filters.dateFrom}
        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
        className="border p-2 rounded"
        placeholder="From date"
      />

      {/* To date */}
      <input
        type="date"
        value={filters.dateTo}
        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
        className="border p-2 rounded"
        placeholder="To date"
      />
      </div>

      {/* Display active filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Search: "{filters.search}"
            </span>
          )}
          {filters.category !== 'all' && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Category: {categories.find(c => c.id ===parseInt(filters.category))?.name}
            </span>
          )}
          {filters.type !== 'all' && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Type: {filters.type === 'income' ? '💰 Income' : '💸 Expense'}
            </span>
          )}
          {filters.dateFrom && (
            <span className="bg-orange-100 text-oragen-800 px-3 py-1 rounded-full text-sm">
              From: {filters.dateFrom}
            </span>
          )}
          {filters.dateTo && (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              To: {filters.dateTo}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
