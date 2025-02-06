import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  username: string;
  @Prop()
  password?: string;
  @Prop()
  full_name: string;
  @Prop()
  role: string;
  @Prop()
  status: string;
  @Prop()
  refresh_token?: string;
  @Prop()
  last_login_date?: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.virtual('id').get(function() {
  return this._id.toHexString();
});