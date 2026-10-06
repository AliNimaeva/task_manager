import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "task-manager-tasks";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.log("Ошибка чтения localStorage:", e);
    return [];
  }
}

const initialState = loadFromStorage();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(text, tag) {
        return {
          payload: {
            id: nanoid(),
            text: text.trim(),
            tag: tag.trim() || "общее",
            done: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    toggleTask(state, action) {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.done = !task.done;
      }
    },

    deleteTask(state, action) {
      return state.filter((t) => t.id !== action.payload);
    },

    clearDone(state) {
      return state.filter((t) => !t.done);
    },
  },
});

export const { addTask, toggleTask, deleteTask, clearDone } =
  tasksSlice.actions;

export default tasksSlice.reducer;

export const selectAllTasks = (state) => state.tasks;

export const selectActiveTasks = (state) => state.tasks.filter((t) => !t.done);

export const selectDoneTasks = (state) => state.tasks.filter((t) => t.done);

export const selectTotalCount = (state) => state.tasks.length;
export const selectActiveCount = (state) =>
  state.tasks.filter((t) => !t.done).length;
export const selectDoneCount = (state) =>
  state.tasks.filter((t) => t.done).length;

export const selectAllTags = (state) => [
  "all",
  ...new Set(state.tasks.map((t) => t.tag)),
];
