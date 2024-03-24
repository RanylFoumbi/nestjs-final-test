import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // @Prop({unique: true, auto: true})
  // _id: ObjectId;

  @Prop({unique: true, required: true})
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);