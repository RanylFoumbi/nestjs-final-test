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

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },
            { name: User.name, schema: UserSchema },
        ]),
        UserModule,
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
