import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateTokens.js";

// register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file; // Requires Multer middleware in your route

  // Fixed the spelling of "message"
  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt);

    // Uploading to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hasPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
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

    if (bcrypt.compare(password, company.password)) {
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
      res.json({ success: false, massage: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: false, massage: error.massage });
  }
};

// Rest of your placeholders...
export const getCompanyData = async (req, res) => {};
export const postJob = async (req, res) => {};
export const getCompanyJobApplicants = async (req, res) => {};
export const getCompanyPostedJobs = async (req, res) => {};
export const changeJobsApplicationsStatus = async (req, res) => {};
export const changeVisibility = async (req, res) => {};
