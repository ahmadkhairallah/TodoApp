import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { TodoType } from "../types";

type TodoStore = {
  todos: TodoType[];
  addTodo: (todo: string) => void;
  editTodo: (id: string, content: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (content) => {
        const newKey = uuidv4();
        set((state) => ({
          todos: [
            {
              id: newKey,
              content: content,
              isCompleted: false,
            },
            ...state.todos,
          ],
        }));
      },
      editTodo: (id, content) => {
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                content: content,
              };
            }
            return todo;
          }),
        }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                isCompleted: !todo.isCompleted,
              };
            }
            return todo;
          }),
        }));
      },
      removeTodo: (itemId) => {
        set((state) => ({
          todos: state.todos.filter(({ id }) => id !== itemId),
        }));
      },
    }),
    {
      name: "todosStore",
    }
  )
);
