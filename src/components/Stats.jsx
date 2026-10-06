import { useSelector } from 'react-redux';
import {
    selectTotalCount,
    selectActiveCount,
    selectDoneCount,
} from '../features/tasks/tasksSlice';

function Stats() {
    const total = useSelector(selectTotalCount);
    const active = useSelector(selectActiveCount);
    const done = useSelector(selectDoneCount);

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