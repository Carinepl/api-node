import { TaskType } from "../entities/TaskType";
import { Task } from "../entities/Task";
import { TaskStatus } from "../entities/TaskStatus";
import { TaskRepository } from "../repositores/TaskRepository";
import { InvalidPropertiesException } from "../exceptions/InvalidPropertiesException";

export interface CreateTaskPayload {

    id?: string;
    summary: string;
    description: string;
    type: TaskType;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    assignee?: string;
    reporter: string;
}

export class CreateTask {


constructor(private readonly repository: TaskRepository) {}

public async execute(payload: CreateTaskPayload) {
  // VALIDAÇÃO DE DADOS
  if (!payload.summary || !payload.description || !payload.reporter) {
    throw new InvalidPropertiesException();
  }

  const newTask = Task.build({
    id: payload.id,
    summary: payload.summary,
    description: payload.description,
    type: payload.type,
    status: payload.status,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    assignee: payload.assignee,
    reporter: payload.reporter,
  });

  
 
  this.repository.create(newTask);
}
}