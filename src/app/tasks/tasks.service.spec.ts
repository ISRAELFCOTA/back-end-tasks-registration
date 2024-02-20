import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TasksEntity } from "./mail.entity";

describe("TasksService", () => {
  let taskService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TasksEntity), // mock de metodos para testar cenarios da aplicação
          useValue: {},
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
  });

  it("should be defined", () => {
    expect(taskService).toBeDefined();
  });
});
