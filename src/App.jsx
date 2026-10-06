import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Stats from './components/Stats';
import TaskList from './components/TaskList';

import {
    selectAllTasks,
    selectAllTags,
    selectDoneCount,
    clearDone,
} from './features/tasks/tasksSlice';

const STORAGE_KEY = 'task-manager-tasks';

function App() {
    const tasks = useSelector(selectAllTasks);
    const allTags = useSelector(selectAllTags);
    const doneCount = useSelector(selectDoneCount);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [tagFilter, setTagFilter] = useState('all');

    // Синхронизация с localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

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

            <TaskForm />

            <Stats />

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

            <TaskList tasks={visibleTasks} />

            <button
                type="button"
                className="clear-done-btn"
                onClick={() => dispatch(clearDone())}
                disabled={doneCount === 0}
            >
                🗑 Удалить все выполненные
            </button>
        </div>
    );
}

export default App;