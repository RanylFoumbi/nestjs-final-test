import { IsNotEmpty, IsNumberString, IsPositive } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    userId: string;

    @IsPositive()
    @IsNotEmpty()
    @IsNumberString()
    priority: number;
}
