import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ToDoModule from './todolist/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/guard';

@Module({
  imports: [ToDoModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
