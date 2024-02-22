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

  describe("readAllTasks", () => {
    it("should return all tasks", async () => {
      // Act
      const result = await taskService.readAll();
      // Assert
      expect(result).toBeDefined();
    });
  });

  describe("save", () => {
    it("should save a new task with success", async () => {
      // Arrange
      const data: SaveTaskDto = {
        taskName: "programar",
        taskStatus: "rodando",
      };
      const tasksEntityMock = {
        ...data,
      } as TasksEntity;
      jest.spyOn(taskRepository, "create").mockReturnValueOnce(tasksEntityMock);
      jest.spyOn(taskRepository, "save").mockResolvedValueOnce(tasksEntityMock);
      // Act
      const result = await taskService.save(data);
      // Assert
      expect(result).toBeDefined();
      expect(taskRepository.create).toHaveBeenCalledTimes(1);
      expect(taskRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
