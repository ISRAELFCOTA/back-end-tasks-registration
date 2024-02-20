import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "tasks" })
export class TasksEntity {
  @PrimaryGeneratedColumn("uuid")
  task_id: string;

  @Column({ name: "task_name", nullable: false })
  taskName: string;

  @Column({ name: "task_status", type: "int", nullable: false })
  taskStatus: string;

  @CreateDateColumn({ name: "create_date_task" }) //cria datetime para controle de criação das tarefas
  createDateTask: string;

  @UpdateDateColumn({ name: "update_date_task" }) //cria datetime para controle de mudanças das tarefas
  updateDateTask: string;
}
