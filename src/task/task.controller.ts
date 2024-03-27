import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from '../infrastructure/database/schema/task.schema';
import { UserService } from '../user/user.service';

@Controller()
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService
    ) {}

    @Post()
    async addTask(@Body() payload: CreateTaskDto): Promise<void> {
        try {
            if (!payload.name || !payload.userId || !payload.priority)
                throw new HttpException("Missing required fields", HttpStatus.BAD_REQUEST);
            const user = await this.userService.getUser(payload.userId);
            if (!user)
                throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
            await this.taskService.addTask(
                payload.name,
                payload.userId,
                payload.priority,
            );
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

    @Get(":userId")
    async getUserTasks(@Param("userId") userId: string ): Promise<Task[]> {
        try {
            return this.taskService.getUserTasks(userId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
