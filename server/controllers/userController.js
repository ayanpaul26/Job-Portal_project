import JobApplication from "../models/JobApplication.js";
// import user from "../models/User.js";
import Job from "../models/Jobs.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";
import { getAuth } from "@clerk/express";
import { clerkMiddleware } from '@clerk/express';
// Get User Data

export const getUserData = async (req, res) => {
  try {
    // const userId = req.auth?.userId;
    const { userId } = getAuth(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Apply For Job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const { userId } = getAuth(req);

    const isAlreadyApplied = await JobApplication.find({
      jobId,
      userId,
    });

    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "Already Applied",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: "Job Not Found",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({
      success: true,
      message: "Applied Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Applications
export const getUserJobApplications = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update Resume
export const updateUserResume = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    const resumeFile = req.file;
    

    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "raw",
      });

      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({
      success: true,
      message: "Resume Updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
