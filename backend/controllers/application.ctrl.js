import asyncHandler from "express-async-handler"
import Application from "../models/application.model.js";
import { Job } from "../models/job.model.js";

const applyJob = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false
      })
    };
    //check if the user has alerady applied or not?
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for this job",
        success: false
      })
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false
      })
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    })
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully.",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
})

const getAppliedJobs = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;

    // Find applications with the userId and sort by createdAt
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } },
        }
      });

    // Check if the applications array is empty
    if (applications.length === 0) {
      return res.status(200).json({
        message: "No applications found.",
        success: true,
        data: []
      });
    }

    return res.status(200).json({
      data: applications,
      success: true
    });

  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(500).json({
      message: "An error occurred while fetching applied jobs.",
      success: false
    });
  }
});


//for admin to check how many users applied for the job
const getApplicants = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant"
      }
    })
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false
      })
    };
    return res.status(200).json({
      data: job,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
})

const updateStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false
      })
    };

    const application = await Application.findOne({ _id: applicationId })

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      })
    }
    //update status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status updated successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
})

export { applyJob, getAppliedJobs, getApplicants, updateStatus }