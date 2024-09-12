import { model, Schema } from "mongoose";

const enforcementSettingSchema = new Schema({
  distractionControl: String,
  notificationPreferences: String,
  parentalAlerts: String,
  userId: { type: String},
});

const Enforcement = model('Enforcement', enforcementSettingSchema);

export default Enforcement;
