
export interface Todo {
    id: number;
    text: string;
    rating: number;
    progress: string;
    completed: boolean;
}

export enum ActionType {
    ADD_TODO,
    COMPLETE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    UNCOMPLETE_TODO,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}