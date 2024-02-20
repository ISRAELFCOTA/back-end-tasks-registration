import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TasksEntity } from "./mail.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
  ) {}
}
