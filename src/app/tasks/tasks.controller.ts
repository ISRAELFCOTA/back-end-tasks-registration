import { Body, Controller, Post, Get, Param, Delete, Patch, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { SaveTaskDto } from "./dto/save-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksEntity } from "./tasks.entity";

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
  @Get(":id")
  async readTask(@Param("id") id: string) {
    return this.taskService.readTask({ taskId: id });
  }
  @Delete(":id")
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.taskService.deleteTask({ taskId: id });
  }

  @Put(":id")
  async updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<TasksEntity> {
    updateTaskDto.taskId = id;
    return await this.taskService.updateTask(updateTaskDto);
  }
}
