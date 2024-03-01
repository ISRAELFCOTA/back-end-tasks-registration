import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TasksEntity } from "./tasks.entity";
import { Repository } from "typeorm";
import { SaveTaskDto } from "./dto/save-task.dto";

describe("TasksService", () => {
  let taskService: TasksService;
  let taskRepository: Repository<TasksEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TasksEntity),
          useValue: {
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue(undefined), // Mocking findOne to return undefined
            delete: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<TasksEntity>>(getRepositoryToken(TasksEntity));
  });

  it("should be defined", () => {
    expect(taskService).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe("readTask", () => {
    it("should return undefined if task is not found", async () => {
      // Arrange
      const taskId = "6352e554-9adc-4741-8015-7374654b8428";
      const readTaskDto = { taskId };
      // Act
      const result = await taskService.readTask(readTaskDto);
      // Assert
      expect(result).toBeUndefined();
      expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { task_id: taskId } });
    });
  });

  describe("deleteTask", () => {
    it("should not throw error if task is not found", async () => {
      // Arrange
      const taskId = "6352e554-9adc-4741-8015-7374654b8428";
      const deleteTaskDto = { taskId };
      // Act & Assert
      await expect(taskService.deleteTask(deleteTaskDto)).resolves.not.toThrow();
      expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
    });
  });
});
