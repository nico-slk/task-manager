import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('User', UserSchema);

export default Task;
