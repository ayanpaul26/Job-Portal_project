import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import kconvert from "k-convert"
import moment from "moment"
const Applyjob = () => {
  const { id } = useParams();

  const [JobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);
const fetchJob = async () => {
  const data = jobs.find(job => job._id === id)
  setJobData(data)
}

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className=" bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400">
            <div className="flex flex-col md:flex-row items-center">
              <img className="h-24 bg-white rounded-lg p-4 mr-4 max-md-4 border "  src={JobData.companyId.image} />
              <div className="text-center md:text-left text-neutral-700">
                <h1>{JobData.title}</h1>
              </div>
              <div>
              <span>
                <img src={assets.suitcase_icon} />
                {JobData.companyId.name}
              </span>
               <span>
                <img src={assets.location_icon} />
                {JobData.location}
              </span>
               <span>
                <img src={assets.person_icon} />
                {JobData.location}
              </span>
              <span>
                <img src={assets.money_icon} />
                CTC:{kconvert.convertTo(JobData.salary)}
              </span>
            </div>
            </div>
            <div>
            <button>
              Apply Now
            </button>
            <p> Posted {moment(JobData.data).fromNow()}</p>
          </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};


export default Applyjob;
