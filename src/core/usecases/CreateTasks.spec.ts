import { describe, it, beforeEach} from "node:test";
import expect from 'expect'; 
import { InMemoryTaskRepository } from "../in-memory/InMemoryTaskRepository";
import { CreateTask, CreateTaskPayload } from "./CreateTasks";
import { InvalidPropertiesException } from "../exceptions/InvalidPropertiesException";
import { TaskType } from "../entities/TaskType";
import { TaskStatus } from "../entities/TaskStatus";

let sut: CreateTask;
let repository: InMemoryTaskRepository;


describe("CreateTask", () => {
    beforeEach(() => {
        repository = new InMemoryTaskRepository();
        sut = new CreateTask(repository);
    });


    it("should create a task", async () => {
        const payload: CreateTaskPayload = {
            summary: "Summary",
            description: "Description",
            type: TaskType.TASK,
            status: TaskStatus.OPEN,
            updatedAt: new Date(),
            createdAt: new Date(),
            reporter: "Reporter",
            assignee: "assignee",
        }

        await sut.execute(payload);

        expect(repository.tasks.length).toBe(1);
    })

    it("should throw an exception if summary is missing", async () => {
        const invalidPayload: CreateTaskPayload = {
            summary: "",
            description: "Description",
            type: TaskType.TASK,
            status: TaskStatus.OPEN,
            updatedAt: new Date(),
            createdAt: new Date(),
            reporter: "Reporter",
        }

        await expect(sut.execute(invalidPayload)).rejects.toBeInstanceOf(InvalidPropertiesException);
    });
    it("should throw an exception if description is missing", async () => {
        const invalidPayload: CreateTaskPayload = {
            summary: "Summary",
            description: "",
            type: TaskType.TASK,
            status: TaskStatus.OPEN,
            updatedAt: new Date(),
            createdAt: new Date(),
            reporter: "Reporter",
        }

        await expect(sut.execute(invalidPayload)).rejects.toBeInstanceOf(InvalidPropertiesException);
    });

   
    it("should throw an exception if reporter is missing", async () => {
        const invalidPayload: CreateTaskPayload = {
            summary: "Summary",
            description: "Description",
            type: TaskType.TASK,
            status: TaskStatus.OPEN,
            updatedAt: new Date(),
            createdAt: new Date(),
            reporter: "",
        }

        await expect(sut.execute(invalidPayload)).rejects.toBeInstanceOf(InvalidPropertiesException);
    });
});