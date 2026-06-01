import express from "express"
import { changeJobsApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"
import uplod from "../config/multer.js"
import { protectCompany } from "../middleware/authMiddleware.js"
// import { getCompanies } from "../controllers/companyController.js";
const router = express.Router()

// Register a company 
router.post('/register',uplod.single('image'), registerCompany)

//companylogin
router.post('/login',loginCompany)

//get company data
router.get('/company',protectCompany, getCompanyData)

//post a job
 router.post('/post-job',protectCompany,postJob)

 //get applicants data 
 router.get('/applicants',protectCompany,getCompanyJobApplicants)
 //get company job liste

 router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

// change Application status
router.post('/change-status',protectCompany,changeJobsApplicationsStatus)
//change application visibility
router.post('/change-visibility',protectCompany,changeVisibility)


// // test 
// router.get("/all-companies", getCompanies);
export default router