import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseShema } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ _id: true })
    id: MongooseShema.Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
