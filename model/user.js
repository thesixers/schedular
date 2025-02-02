import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
  });

  userSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt();

        this.password = await bcrypt.hash(this.password, salt);
    }
    next()
  });

  userSchema.statics.login = async function({email, password}){
    let user = await this.findOne({email});

    console.log(user);
    console.log({email, password});

    if(!user) throw Error('invalid user');

    if(password === '') throw Error('password field is empty');

    let passCheck = await bcrypt.compare(password,user.password);

    if(!passCheck) throw Error('incorrect password');

    return user;
}

  
  const User = model('Duser', userSchema);

  export default User;
