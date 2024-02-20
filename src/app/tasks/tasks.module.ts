import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksEntity } from "./mail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  providers: [TasksService],
})
export class TasksModule {}
