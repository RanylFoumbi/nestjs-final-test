import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Task,
    TaskSchema,
} from '../infrastructure/database/schema/task.schema';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from '../user/user.module';
import {
    User,
    UserSchema,
} from '../infrastructure/database/schema/user.schema';
import { UserService } from '../user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [TaskController],
    providers: [TaskService, UserService],
})
export class TaskModule {}
