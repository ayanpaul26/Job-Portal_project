import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { useEffect } from "react"
import { jobsData } from "../assets/assets"

const Applyjob = () => {

  const { id } = useParams()

  const[JobData,setJobData] = useState(null)

const { jobs } = useContext(AppContext)
  const fetchJob  = async() =>{
    const data = jobs.filter(job => job._id === id)
    if(data.length !== 0){
    setJobData(data[0])
    console.log(data[0])
    }
  }

  useEffect(()=>{
    if(jobs.length>0){
      fetchJob()
    }
  
  },[id,jobs])
  // from here we will start
  // 2:25:00
  return JobData ? (
    <div>
      
    </div>
  ) : (
    <div>

    </div>
  )
}

export default Applyjob
