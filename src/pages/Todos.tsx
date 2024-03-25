import { BiSolidHappyHeartEyes } from "react-icons/bi";
import { useTodoStore } from "../store/todoStore";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const Todos = () => {
  const { todos } = useTodoStore((state) => state);

  return (
    <div className="w-full max-w-2xl mx-auto  flex flex-col items-center gap-4 py-8">
      <TodoForm />
      <div className="w-full flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {todos.length > 0 ? (
            todos.map((todo) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -400, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  key={todo.id}
                >
                  <TodoItem {...todo} />
                </motion.div>
              );
            })
          ) : (
            <div className="h-60 bg-gray-900 flex flex-col items-center justify-center gap-4 font-bold text-2xl rounded-xl">
              <BiSolidHappyHeartEyes size={50} />
              <h2>You have nothing to do</h2>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Todos;
