
import { TodoResponse } from "@/types/todos";
import http from "./http.request";

export const getTodos = async () => {
  const { data } = await http.get<TodoResponse>("/todos");
  return data;
};

