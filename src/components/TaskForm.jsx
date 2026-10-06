import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

function TaskForm() {
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(addTask(text, tag));
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