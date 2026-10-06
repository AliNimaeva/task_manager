import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'task-manager-tasks';

function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.log('Ошибка чтения localStorage:', e);
        return [];
    }
}

function App() {
    const [tasks, setTasks] = useState(loadTasks);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'
    const [tagFilter, setTagFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text, tag) => {
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            tag: tag.trim() || 'общее',
            done: false,
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const clearDone = () => {
        setTasks((prev) => prev.filter((t) => !t.done));
    };

    // Собираем все уникальные теги для фильтра
    const allTags = ['all', ...new Set(tasks.map((t) => t.tag))];

    // Применяем поиск + фильтр по статусу + фильтр по тегу
    const visibleTasks = tasks.filter((t) => {
        const matchesSearch = t.text
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            filter === 'all' ||
            (filter === 'active' && !t.done) ||
            (filter === 'done' && t.done);
        const matchesTag = tagFilter === 'all' || t.tag === tagFilter;
        return matchesSearch && matchesStatus && matchesTag;
    });

    return (
        <div className="container">
            <header className="app-header">
                <h1>Менеджер задач</h1>
            </header>

            <TaskForm onAdd={addTask} />

            <Stats tasks={tasks} />

            <div className="controls">
                <SearchBar value={search} onChange={setSearch} />
                <FilterBar
                    filter={filter}
                    onChange={setFilter}
                    tagFilter={tagFilter}
                    onTagChange={setTagFilter}
                    tags={allTags}
                />
            </div>

            <TaskList
                tasks={visibleTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
            />

            <button
                type="button"
                className="clear-done-btn"
                onClick={clearDone}
                disabled={!tasks.some((t) => t.done)}
            >
                🗑 Удалить все выполненные
            </button>
        </div>
    );
}

export default App;