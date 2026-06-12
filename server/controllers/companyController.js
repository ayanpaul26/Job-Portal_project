import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateTokens.js";
import company from "../models/Company.js";
import Job from "../models/Jobs.js";
import JobApplication from "../models/JobApplication.js";
// register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file; // Requires Multer middleware in your route

  // Fixed the spelling of "message"
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Uploading to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    // Fixed error.message typo so you can see actual errors in Postman
    res.status(500).json({ success: false, message: error.message });
  }
};

// company login

export const loginCompany = async (req, res) => {
  // will continue from here (6:25:12)

  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Rest of your placeholders...
//post job
export const postJob = async (req, res) => {
  //will cont....
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, massage: error.massage });
  }
};
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    // adding no of applicants info in data

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      }),
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
      await job.save();
    }

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//7:17:45 will cont....

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    const applicants = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applicants });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeJobsApplicationsStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    // find job applications data and update

    await JobApplication.findOneAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
