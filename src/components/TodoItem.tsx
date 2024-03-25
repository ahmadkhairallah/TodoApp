import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTodoStore } from "../store/todoStore";
import TodoForm from "./TodoForm";
import { TodoType } from "../types";

const TodoItem = (todo: TodoType) => {
  const { id, content, isCompleted } = todo;
  const { toggleTodo, removeTodo } = useTodoStore((state) => state);
  const [isEditable, setIsEditable] = useState(false);

  const handleDeleteTodo = () => {
    removeTodo(id);
    toast.success("Todo deleted successfully!");
  };

  return (
    <div
      className={`w-full p-4 rounded-xl max-h-48 ${
        isCompleted ? "bg-gray-900/40" : "bg-gray-900"
      }`}
    >
      {isEditable ? (
        <TodoForm
          isEditable={isEditable}
          todo={todo}
          setIsEditable={setIsEditable}
        />
      ) : (
        <div className="flex flex-col gap-8  break-words">
          <h4 className={`${isCompleted && "line-through opacity-50"}`}>
            {content}
          </h4>
          <div className="flex justify-between items-center ">
            <button
              className="[&>*]:inline-flex [&>*]:items-center [&>*]:gap-1"
              onClick={() => toggleTodo(id)}
            >
              {isCompleted ? (
                <span>
                  <IoMdCheckboxOutline /> Mark Completed
                </span>
              ) : (
                <span>
                  <TfiReload /> Mark Undone
                </span>
              )}
            </button>
            <div className="[&>*]:inline-flex [&>*]:items-center [&>*]:gap-1 [&>*]:mx-2">
              <button onClick={() => setIsEditable(true)}>
                <FaEdit /> Edit
              </button>
              <button onClick={handleDeleteTodo} className="text-red-500">
                <MdOutlineDeleteOutline /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TodoItem;
