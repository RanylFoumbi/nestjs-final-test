import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsNumberString()
    priority: number;
}
