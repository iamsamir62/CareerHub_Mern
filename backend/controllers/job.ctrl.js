import asyncHandler from "express-async-handler"
import { Job } from "../models/job.model.js";
//admin will post jobs
const postJob = asyncHandler(async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;
    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId || !userId) {
      return res.status(400).json({
        message: "Some fields are missing. Please provide all required fields.",
        success: false
      });
    }
    const job = await Job.create({
      title,
      description,
      requiremets: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_By: userId
    });
    return res.status(201).json({
      message: "New job created successfully",
      data: job,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
})

//student gets all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    }
    const jobs = await Job.find(query).populate({
      path: "company"
    }).sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false
      })
    }
    return res.status(200).json({
      data: jobs,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
})
//student get single job
const getJobById = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false
      })
    }
    return res.status(200).json({
      job,
      success: true
    })

  } catch (error) {
    console.log(error);


  }
})

//show admin created jobs
const getAdminJobs = asyncHandler(async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_By: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false
      })
    }
    return res.status(200).json({
      data: jobs,
      success: true
    })

  } catch (error) {
    console.log(error);


  }
})

export { getAllJobs, postJob, getJobById, getAdminJobs }