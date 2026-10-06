function Stats({ tasks }) {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const active = total - done;

    return (
        <div className="stats">
            <div className="stat-item">
                <span className="stat-value">{total}</span>
                <span className="stat-label">всего</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{active}</span>
                <span className="stat-label">активных</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{done}</span>
                <span className="stat-label">выполнено</span>
            </div>
        </div>
    );
}

export default Stats;