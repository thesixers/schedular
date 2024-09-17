import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const adminSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
  });

  adminSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt();

        this.password = await bcrypt.hash(this.password, salt);
    }
    next()
  });

  adminSchema.statics.login = async function({email, password}){
    let user = await this.findOne({email});

    if(!user) throw Error('invalid user');

    if(password === '') throw Error('password field is empty');

    let passCheck = await bcrypt.compare(password,user.password);

    if(!passCheck) throw Error('incorrect password');

    return user;
}

  
  const Admin = model('Dadmin', adminSchema);

  export default Admin;
