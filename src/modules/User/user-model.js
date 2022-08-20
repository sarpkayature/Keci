import mongoose from 'mongoose';

const UserRegisterSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
  },
});

const UserRegister = mongoose.model('User', UserRegisterSchema);

export default UserRegister;
