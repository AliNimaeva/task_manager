function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            className="search-input"
            placeholder="🔎 Поиск задач..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default SearchBar;