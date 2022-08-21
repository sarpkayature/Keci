import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

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

UserRegisterSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserRegisterSchema.methods.comparePassword = function (
  candidatePassword,
  cb
) {
  bcryptjs
    .compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    })
    .catch(err => cb(err));
};

const UserRegister = mongoose.model('User', UserRegisterSchema);

export default UserRegister;
