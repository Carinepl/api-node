import { describe, it, beforeEach} from "node:test";
import expect from 'expect'; 
import { InMemoryTaskRepository } from "../in-memory/InMemoryTaskRepository";
import { CreateTask, CreateTaskPayload } from "./CreateTasks";
import { InvalidPropertiesException } from "../exceptions/InvalidPropertiesException";
import { TaskType } from "../entities/TaskType";
import { TaskStatus } from "../entities/TaskStatus";
import { FindTaskByType } from "./FindTaskByType";
import { randomUUID } from "node:crypto";
import { FindTaskById } from "./FindTaskById";


let repository: InMemoryTaskRepository;
let sut: FindTaskByType;

const mockedId = randomUUID();

