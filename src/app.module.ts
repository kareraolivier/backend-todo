import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { JsonDB, Config } from 'node-json-db';

@Module({
  imports: [TasksModule, CategoriesModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'JsonDBInstance',
      useValue: new JsonDB(new Config('Categories', true, false, '/')),
    },
    AppService,
  ],
  exports: ['JsonDBInstance'],
})
export class AppModule {}
