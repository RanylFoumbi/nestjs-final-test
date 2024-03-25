import { Controller, Post, Body, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from 'src/infrastructure/database/schema/task.schema';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('/task')
    async addTask(@Body() payload: CreateTaskDto): Promise<void> {
        try {
            await this.taskService.addTask(
                payload.name,
                payload.userId,
                payload.priority,
            );
        } catch (error) {
            return Promise.reject(error);
        }
    }

    @Post('/reset')
    async resetData(): Promise<void> {
        try {
            await this.taskService.resetData();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    @Get('/tasks')
    async getUserTasks(@Body() payload: { userId: string }): Promise<Task[]> {
        try {
            await this.taskService.getUserTasks(payload.userId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
