function formatDate(iso) {
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className={`task-item ${task.done ? 'done' : ''}`}>
            <label className="task-checkbox">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                />
            </label>

            <div className="task-body">
                <div className="task-text">
                    {task.done ? '✓' : '⭕'} {task.text}
                </div>
                <div className="task-meta">
                    <span className="task-tag">🏷 {task.tag}</span>
                    <span className="task-date">
                        📅 {formatDate(task.createdAt)}
                    </span>
                </div>
            </div>

            <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete(task.id)}
                title="Удалить"
            >
                ✕
            </button>
        </li>
    );
}

export default TaskItem;