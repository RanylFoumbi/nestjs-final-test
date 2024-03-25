import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../infrastructure/database/schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
    constructor(@Inject(Task.name) private taskModel: Model<Task>) {}

    addTask(name: string, userId: string, priority: number): Promise<Task> {
        try {
            const task = new this.taskModel({ name, userId, priority });

            return task.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getTaskByName(name: string): Promise<Task> {
        try {
            return this.taskModel.findOne({ name }).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getUserTasks(userId: string): Promise<Task[]> {
        try {
            return this.taskModel.find({ userId }).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.taskModel.deleteMany({}).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
