import { PrismaClient } from "@prisma/client";
import type { Todo, TodoWithId } from "@repo/model";

const prisma = new PrismaClient();

export const getTodos = async (): Promise<TodoWithId[]> => {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => ({
        id: todo.id,
        name: todo.name,
    }));
};

export const createTodo = async (todo: Todo): Promise<TodoWithId> => {
    const created = await prisma.todo.create({
        data: {
            name: todo.name,
        },
    });
    return {
        id: created.id,
        name: created.name,
    };
};
