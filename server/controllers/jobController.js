import Job from "../models/Jobs.js";

// get all jobs
export const getJobs = async (req, res) => {
  try {
    const job = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//get a asingle job by id
export const getJobsById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }
    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
