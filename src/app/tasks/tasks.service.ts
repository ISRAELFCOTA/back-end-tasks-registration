import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TasksEntity } from "./tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SaveTaskDto } from "./dto/save-task.dto";
import { ReadTaskDto } from "./dto/read-task.dto";
import { DeleteTaskDto } from "./dto/delete-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
  ) {}

  async save(data: SaveTaskDto): Promise<TasksEntity> {
    return this.taskRepository.save(this.taskRepository.create(data));
  }

  async readAll(): Promise<TasksEntity[]> {
    return this.taskRepository.find();
  }

  async readTask(id: ReadTaskDto): Promise<TasksEntity> {
    return await this.taskRepository.findOne({ where: { task_id: id.taskId } });
  }

  async deleteTask(id: DeleteTaskDto): Promise<void> {
    await this.taskRepository.delete(id.taskId);
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<TasksEntity> {
    const { taskId, taskName, taskStatus } = updateTaskDto;
    const taskToUpdate = await this.taskRepository.findOne({ where: { task_id: taskId } });

    if (!taskToUpdate) {
      throw new Error("Task not found");
    }

    // Construir objeto com as atualizações
    const updates: Partial<TasksEntity> = {};
    if (taskName) {
      updates.taskName = taskName;
    }
    if (taskStatus) {
      updates.taskStatus = taskStatus;
    }

    // Atualizar a tarefa no banco de dados
    await this.taskRepository.update(taskId, updates);

    // Recarregar a tarefa atualizada
    const updatedTask = await this.taskRepository.findOne({ where: { task_id: taskId } });

    return updatedTask;
  }
}
