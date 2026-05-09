import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume: { typr: string },
    image: { type: string ,required: true },
})
const User = mongoose.model('User,userSchema')


export default User;
// done till the User and will continue withcontroller function
// to run back end cd server & then npm run server