export type TodoWithId = Todo & WithId;

export type Todo = {
    name: string;
};

export type Id = string;

export type WithId = {
    id: Id;
};
