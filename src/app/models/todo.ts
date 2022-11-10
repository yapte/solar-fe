import { TodoDto } from "./todo-dto.interface";

export class Todo {
    userId: number;
    id: number;
    name: string;
    completed: boolean;

    constructor(dto: TodoDto) {
        this.userId = dto.userId;
        this.id = dto.id;
        this.name = dto.title;
        this.completed = dto.completed;
    }
}