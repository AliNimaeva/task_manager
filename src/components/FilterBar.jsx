function FilterBar({ filter, onChange, tagFilter, onTagChange, tags }) {
    return (
        <div className="filter-bar">
            <div className="status-filter">
                <button
                    type="button"
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => onChange('all')}
                >
                    Все
                </button>
                <button
                    type="button"
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => onChange('active')}
                >
                    Активные
                </button>
                <button
                    type="button"
                    className={filter === 'done' ? 'active' : ''}
                    onClick={() => onChange('done')}
                >
                    Выполненные
                </button>
            </div>

            <select
                className="tag-filter"
                value={tagFilter}
                onChange={(e) => onTagChange(e.target.value)}
            >
                {tags.map((tag) => (
                    <option key={tag} value={tag}>
                        {tag === 'all' ? 'Все теги' : tag}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterBar;