import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../infrastructure/database/schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    addUser(email: string): Promise<User> {
        try {
            const user = new this.userModel({ email });
            return user.save();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getUser(email: string): Promise<User> {
        try {
            return this.userModel.findOne({ email }).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.userModel.deleteMany({}).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
