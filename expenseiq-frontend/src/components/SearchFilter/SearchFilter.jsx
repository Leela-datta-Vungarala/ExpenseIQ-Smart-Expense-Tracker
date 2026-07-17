import "./SearchFilter.css";

function SearchFilter({

    searchTerm,
    setSearchTerm,

    filterType,
    setFilterType,

    filterCategory,
    setFilterCategory,

    transactions

}) {

    const categories = [
        ...new Set(transactions.map(t => t.category))
    ];

    return (

        <div className="search-filter-container">

            <input
                type="text"
                placeholder="🔍 Search transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>

            <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            >
                <option value="All">All Categories</option>

                {categories.map(category => (

                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>

                ))}

            </select>

        </div>

    );

}

export default SearchFilter;