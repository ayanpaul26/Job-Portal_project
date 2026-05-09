import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <>
      <Navbar />

      <div className="container px-4 2xl:px-20 mx-auto my-10 min-h-[65vh]">
        {/* Resume Section */}
        <h2 className="text-xl font-semibold mb-4">Your Resume</h2>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {isEdit ? (
            <>
              <label
                htmlFor="resumeUpload"
                className="flex items-center cursor-pointer"
              >
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>

                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />

                <img
                  src={assets.profile_upload_icon}
                  alt="Upload Resume"
                  className="w-8 h-8"
                />
              </label>

              <button
                onClick={() => setIsEdit(false)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-400"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <a
                href={resume ? URL.createObjectURL(resume) : "#"}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600"
              >
                {resume ? "View Resume" : "No Resume"}
              </a>

              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300"
              >
                Edit
              </button>
            </>
          )}
        </div>

        {/* Jobs Applied Section */}
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Job Title</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {jobsApplied.length > 0 ? (
                jobsApplied.map((job, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-8 h-8 object-contain"
                        />
                        <span>{job.company}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusClass(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No jobs applied yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Applications;