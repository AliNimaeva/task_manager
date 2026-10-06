import { useState } from 'react';

function TaskForm({ onAdd }) {
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text, tag);
        setText('');
        setTag('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="task-input"
                placeholder="Что нужно сделать?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="text"
                className="tag-input"
                placeholder="Тег (например: работа)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button type="submit" className="add-btn">
                + Добавить
            </button>
        </form>
    );
}

export default TaskForm;