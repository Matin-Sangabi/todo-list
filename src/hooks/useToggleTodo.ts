import { Todo } from "@/types/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousTodos?: Todo[] }>({
    mutationFn: async () => {},

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
};
