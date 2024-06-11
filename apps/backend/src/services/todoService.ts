import * as database from "@repo/database";
import type { Todo, TodoWithId } from "@repo/model";

export const getTodos = async (): Promise<TodoWithId[]> => {
    return database.getTodos();
};

export const createTodo = async (todo: Todo): Promise<TodoWithId> => {
    return database.createTodo(todo);
};
