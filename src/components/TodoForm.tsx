import { useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTodoStore } from "../store/todoStore";
import { TodoType } from "../types";

const TodoSchema = z.object({
  content: z.string().min(3, {
    message: "Todo field cannot be empty!",
  }),
});

type TodoSchemaType = z.infer<typeof TodoSchema>;

const TodoForm = ({
  todo,
  isEditable,
  setIsEditable,
}: {
  todo?: TodoType;
  isEditable?: boolean;
  setIsEditable?: (val: boolean) => void;
}) => {
  const { addTodo, editTodo } = useTodoStore((state) => state);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TodoSchemaType>({ resolver: zodResolver(TodoSchema) });

  const onSubmit: SubmitHandler<TodoSchemaType> = (data) => {
    if (isValid) {
      if (isEditable && todo?.id) {
        editTodo(todo?.id, data.content);
        setIsEditable?.(false);
        toast.success("Todo edited successfully!");
      } else {
        addTodo(data.content);
        toast.success("Todo added successfully!");
        reset();
      }
    }
  };

  useEffect(() => {
    if (errors.content?.message) {
      toast.error(String(errors.content?.message));
    }
  }, [errors]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <div className="flex items-center justify-center gap-4 w-full">
        <input
          placeholder="Start typing..."
          className=" border w-full  border-gray-500 bg-inherit py-2 px-4 rounded-xl ring-0 outline-none focus:ring-2 focus:ring-white "
          {...register("content", {
            required: true,
          })}
          defaultValue={todo?.content}
        />

        <button
          type="submit"
          className={` py-2 px-5 rounded-lg ${
            isEditable ? "bg-orange-500" : "bg-indigo-500"
          }`}
        >
          {isEditable ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
