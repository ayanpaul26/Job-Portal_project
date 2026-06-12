import express from 'express'
import { getJobs, getJobsById } from '../controllers/jobController.js';
const router =  express.Router()

//Router to get all jobs data
router.get('/',getJobs)

//route to get single job by id
router.get('/:id',getJobsById)

export default router;
