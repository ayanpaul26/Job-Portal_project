import express from "express"
import { changeJobsApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"
import uplod from "../config/multer.js"

const router = express.Router()

// Register a company 
router.post('/register',uplod.single('image'), registerCompany)

//companylogin
router.post('/login',loginCompany)

//get company data
router.get('/company',getCompanyData)

//post a job
 router.post('/post-job',postJob)

 //get applicants data 
 router.get('/applicants',getCompanyJobApplicants)
 //get company job liste

 router.get('/list-jobs',getCompanyPostedJobs)

// change Application status
router.post('/change-status',changeJobsApplicationsStatus)
//change application visibility
router.post('/change-visibility',changeVisibility)

export default router