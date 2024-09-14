import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['candidate', 'recruiter'],
    required: true,
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: {
      url: { type: String },           // Resume URL
      originalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
}, { timestamps: true });


// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);

}
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "2d" }
  )
}

const User = mongoose.model('User', userSchema);
export default User;
