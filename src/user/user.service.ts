import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/infrastructure/database/schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    addUser(email: string): Promise<User> {
        try {
            console.log(`Adding user with email: ${email}`);
            const user = new this.userModel({ email });
            return user.save();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    getUser(email: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
