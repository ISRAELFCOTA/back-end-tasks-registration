import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { SaveTaskDto } from "./dto/save-task.dto";
import { ReadTaskDto } from "./dto/read-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Post()
  async createTask(@Body() body: SaveTaskDto) {
    return this.taskService.save(body);
  }
  @Get()
  async readAllTasks() {
    return this.taskService.readAll();
  }

  @Get("/id")
  async readTask(@Param("id") id: ReadTaskDto) {
    return this.taskService.readTask({ taskId: id.taskId });
  }
}
