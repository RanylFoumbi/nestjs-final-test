import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from '../infrastructure/database/schema/task.schema';
import { mongo } from 'mongoose';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async addTask(@Body() payload: CreateTaskDto): Promise<Task> {
        const isUserIdValid = mongo.ObjectId.isValid(payload.userId);
        try {
            if (
                !payload.name ||
                !isUserIdValid ||
                !payload.priority ||
                payload.priority === null ||
                payload.priority === undefined
            )
                throw new HttpException(
                    'Missing required fields',
                    HttpStatus.BAD_REQUEST,
                );
            const task = await this.taskService.addTask(
                payload.name,
                payload.userId,
                payload.priority,
            );
            return task;
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async resetData(): Promise<void> {
        try {
            await this.taskService.resetData();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        try {
            const isUserIdValid = mongo.ObjectId.isValid(userId);
            if (!isUserIdValid)
                throw new HttpException(
                    'Invalid userId provided',
                    HttpStatus.BAD_REQUEST,
                );
            return this.taskService.getUserTasks(userId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
