//register a new company
import Company from "../models/Company.js";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import comapny from "../models/Company.js";
import generateToken from "../utils/generateTokens.js";


export const registerCompany = async (req,res) =>{
const{name,email,password} = req.body
const imageFile = req.file;

if(!name || !email || !password ||!imageFile){
    return res.json({success:false,massage:"Missing Details"})
}
try {
    const  companyExists = await Company.findOne({email})
    if (companyExists) {
     return res.json({success:false , massage: 'Company already registered'})   
    }
    
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password, salt)

    const imageUplod = await cloudinary.uploader.upload(imageFile.path)
    const company =await Company.create({
        name,
        email,
        password: hasPassword,
        image: imageUplod.secure_url
    })
res.json({
    success:true,
    comapny:{
        _id: company._id,
        name: comapany.name,
        email: comapany.email,
        image : company.image,
      
    },
    token :generateToken(company._id)
})
} catch (error) {
    res.json({success:false , massage: error.massage})   


}

}
// companylogin

export const loginCompany = async (req,res) =>{
    // will continue from here (6:25:12)


}

//get company data

export const getCompanyData = async (req,res) =>{


}

//post a new job
export const postJob = async (req,res) =>{


}
//get company job applications
export const getCompanyJobApplicants = async (req,res) =>{


}

//get company posted getCompanyJob
export const getCompanyPostedJobs = async (req,res) =>{


}

// change job applications status 
export const changeJobsApplicationsStatus  = async (req,res) =>{


}

//change job visibility
export const changeVisibility = async (req,res) =>{


}