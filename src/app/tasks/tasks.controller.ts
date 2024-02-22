import { Body, Controller, Post, Get } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { SaveTaskDto } from "./dto/save-task.dto";
import { ReadAllTaskDto } from "./dto/read-all-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Post()
  async createTask(@Body() body: SaveTaskDto) {
    return this.taskService.save(body);
  }
  @Get()
  async readAllTasks(@Body() body: ReadAllTaskDto) {
    return this.taskService.readAll();
  }
}
