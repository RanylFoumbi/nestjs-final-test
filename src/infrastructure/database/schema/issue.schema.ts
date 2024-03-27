import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IssueDocument = HydratedDocument<Issue>;

@Schema()
export class Issue {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    priority: number;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
