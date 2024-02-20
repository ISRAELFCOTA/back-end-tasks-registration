import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TasksEntity } from "./tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SaveTaskDto } from "./dto/save-task.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
  ) {}

  async save(data: SaveTaskDto): Promise<TasksEntity> {
    return this.taskRepository.save(this.taskRepository.create(data));
  }
}
