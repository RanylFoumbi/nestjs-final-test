import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async createUser(): Promise<unknown> {
        return await this.userService.addUser('test@test1.com');
    }
}
