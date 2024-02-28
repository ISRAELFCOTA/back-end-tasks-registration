import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./app/tasks/tasks.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5441,
      database: "postgres",
      username: "postgres",
      password: "admin421",
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.js,.ts}"],
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
