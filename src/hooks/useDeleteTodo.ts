import { Todo } from "@/types/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number, { previousTodos?: Todo[] }>({
    mutationFn: async () => {},

    onMutate: async (id) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== id)
      );

      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
};
