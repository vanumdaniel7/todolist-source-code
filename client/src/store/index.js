import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
    data: [

    ]
}

const todoSlice = createSlice({
    name: "todo",
    initialState: initialTodoState,
    reducers: {
        getAllTodos(state, action) {
            state.data = action.payload;
        },
        createTodo(state, action) {
            state.data = [...state.data, { id: action.payload.id, status: "Active", task: action.payload.task }];
        },
        updateTodo(state, action) {
            for(let todo of state.data) {
                if(todo.id === action.payload.id) {
                    todo.task = action.payload.task;
                }
            }
        },
        deleteTodo(state, action) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        finishTodo(state, action) {
            for(let todo of state.data) {
                if(todo.id === action.payload) {
                    todo.status = "Completed";
                }
            }
        }
    }
});

const store = configureStore({
    name: "todo",
    reducer: {
        todo: todoSlice.reducer
    }
});

export default store;
export const todoActions = todoSlice.actions;