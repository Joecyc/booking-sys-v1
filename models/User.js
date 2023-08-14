import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    data: { type: Buffer },
    contentType: { type: String },
  },
  role: {
    type: String,
    required: false,
  },
  admin: {
    type: Number,
    required: false,
  }, //todo : teacher ID , student ID
});

const User = mongoose.model("users", UserSchema);

export default User;
