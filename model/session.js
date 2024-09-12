import { model, Schema } from "mongoose";

const studySessionSchema = new Schema({
    subject: String,
    topic: String,
    date: String,
    time: String,
    duration: String,
    status: { type: String, enum: ['completed', 'missed', 'upcoming','started','abandoned'], default: 'upcoming' },
    userId: { type: String},
  });

  const session = model('session', studySessionSchema); 

  export default session;
  