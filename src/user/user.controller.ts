import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/infrastructure/database/schema/user.schema';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    private static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    @Post()
    async createUser(@Body('email') email: string): Promise<User> {
        if (!UserController.isValidEmail(email)) {
            throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
        }

        if (await this.userService.getUser(email)) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        return this.userService.addUser(email);
    }

    @Post('/reset')
    async resetData(): Promise<void> {
        await this.userService.resetData();
    }

    @Get('/get')
    async getUser(@Body('email') email: string): Promise<User> {
        return await this.userService.getUser(email);
    }
}
