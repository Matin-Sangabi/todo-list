"use client";

import TasksCard from "@/components/custom/tasks/TasksCard";
import TasksCardLoading from "@/components/custom/tasks/TasksCardLoading";
import TasksSearch from "@/components/custom/tasks/TasksSearch";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { useToggleTodo } from "@/hooks/useToggleTodo";
import { getTodos } from "@/service/todos.service";
import { useQuery } from "@tanstack/react-query";
import { Plus, ShieldX } from "lucide-react";
import { useMemo, useState } from "react";
import AddNewTasks from "./AddNewTasks";
import EmptyTasks from "@/components/custom/tasks/EmptyTasks";
import useDebounce from "@/hooks/useDebounce";

export default function Tasks() {
  const [openNewTasks, setOpenNewTasks] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchDebounce = useDebounce(searchTerm, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    retry: false,
  });

  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const filteredTodos = useMemo(() => {
    if (!data) return [];

    return data.filter((todo) =>
      todo.title.toLowerCase().includes(searchDebounce.toLowerCase())
    );
  }, [data, searchDebounce]);

  return (
    <>
      <TasksSearch searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <div className="w-full max-w-3xl mx-auto px-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
        {error ? (
          <>
            <div className="w-full p-3 rounded-sm bg-red-50 text-red-700 flex items-center gap-x-2">
              <ShieldX />
              <span className="font-semibold">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong! Please try again later."}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col gap-y-4">
              {/* tasks */}
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <TasksCardLoading key={idx} />
                  ))}
                </>
              ) : filteredTodos && filteredTodos.length > 0 ? (
                <>
                  {filteredTodos.map((tasks) => (
                    <TasksCard
                      key={tasks.id}
                      name={tasks.title}
                      isCompleted={tasks.completed}
                      onComplete={() => toggleTodo.mutate(tasks.id)}
                      onEdit={() => {}}
                      onDelete={() => deleteTodo.mutate(tasks.id)}
                    />
                  ))}
                </>
              ) : (
                <>
                  <EmptyTasks />
                </>
              )}
            </div>
          </>
        )}
      </div>
      {/* add new tasks */}
      <div className="absolute  -bottom-4 right-10">
        <button
          onClick={() => {
            setOpenNewTasks(true);
          }}
          className="size-12 bg-primary flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:rotate-90 transition-transform duration-300"
        >
          <Plus className="text-white " />
        </button>
      </div>
      {/* add new tasks modal */}
      {openNewTasks && (
        <AddNewTasks
          open={openNewTasks}
          onClose={() => setOpenNewTasks(false)}
        />
      )}
    </>
  );
}
