import { Todo } from "@/types/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo, // return
    Error,
    string,
    { previousTodos?: Todo[] }
  >({
    mutationFn: async (title) => ({
      id: Date.now(),
      title,
      completed: false,
      userId: 1,
    }),

    onMutate: async (title) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        {
          id: Date.now(),
          title,
          completed: false,
          userId: 1,
        },
        ...old,
      ]);

      return { previousTodos };
    },

    onError: (_err, _title, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
};
