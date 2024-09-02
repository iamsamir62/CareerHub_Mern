import mongoose from "mongoose";
const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requiremets: {
    type: String,

  },
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  position: {
    type: Numer,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,

  },
  created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    }
  ]
}, { timestamps: true })

export const Job = mongoose.model("job", JobSchema)