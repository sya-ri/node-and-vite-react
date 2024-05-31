import * as repository from "@/repositories/todoRepository.js";
import type { Todo, TodoWithId } from "@repo/model";

export const getTodos = async (): Promise<TodoWithId[]> => {
    return repository.getTodos();
};

export const createTodo = async (todo: Todo): Promise<TodoWithId> => {
    return repository.createTodo(todo);
};
