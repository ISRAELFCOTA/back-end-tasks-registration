import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { SaveTaskDto } from "./dto/save-task.dto";
import { TasksEntity } from "./tasks.entity";

describe("TasksController", () => {
  let taskController: TasksController;
  let taskService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TasksService>(TasksService);
  });

  it("should be defined", () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
  });

  describe("createTask", () => {
    it("Should save a new task with success", async () => {
      // Arrange
      const body: SaveTaskDto = {
        taskName: "programar",
        taskStatus: "rodando",
      };
      const taskEntityMock = {
        ...body,
      } as TasksEntity;
      jest.spyOn(taskService, "save").mockResolvedValueOnce(taskEntityMock);

      // Act
      const result = await taskController.createTask(body);

      // Assert
      expect(result).toEqual(taskEntityMock);
      expect(taskService.save).toHaveBeenCalledWith(body); // Verifica se o método save foi chamado com os argumentos esperados
    });
  });
});
