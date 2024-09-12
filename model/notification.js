import { model, Schema } from "mongoose";

const notificationSchema = new Schema({
    message: String,
    type: { type: String, enum: ['reminder', 'alert', 'system'] },
    createdAt: String,
    userId: String,
    isRead: { type: Boolean, default: false },
  }); 

  const notification = model('notification', notificationSchema);

  export default notification;
  