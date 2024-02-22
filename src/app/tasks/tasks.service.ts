import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TasksEntity } from "./tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SaveTaskDto } from "./dto/save-task.dto";
import { ReadTaskDto } from "./dto/read-task.dto";

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

  /*  async readTask(id: ReadTaskDto): Promise<TasksEntity[]> {
    return this.taskRepository.find({ where: { task_id: id.taskId } });
  } */
  async readTask(params?: Partial<ReadTaskDto>) {
    const query = this.taskRepository.createQueryBuilder("tasks");
    if (params?.taskId) {
      query.where("tasks.taskId == :taskId", { taskId: params.taskId });
    }

    return query.getMany();
  }
}
