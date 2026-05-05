import { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />

      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        {/* Resume Section */}
        <h2 className="text-xl font-semibold mb-4">Your Resume</h2>

        <div className="flex gap-2 mb-8">
          {isEdit ? (
            <>
              <label
                className="flex items-center cursor-pointer"
                htmlFor="resumeUpload"
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
                  alt="upload"
                  className="w-8 h-8"
                />
              </label>

              <button
                onClick={() => setIsEdit(false)}
                className="bg-green-200 text-green-700 px-4 py-2 rounded-lg border border-green-400"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <a
                href={resume ? URL.createObjectURL(resume) : "#"}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600"
              >
                Resume
              </a>

              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg bg-gray-200"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied Section */}
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-8 h-8 object-contain"
                    />
                    {job.company}
                  </td>

                  <td className="px-4 py-3">{job.title}</td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">{moment(job.date).format("ll")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1  rounded-full text-sm font-medium
                             ${
                               job.status === "Accepted"
                                 ? "bg-green-100 text-green-600"
                                 : job.status === "Rejected"
                                   ? "bg-red-100 text-red-600"
                                   : "bg-blue-100 text-blue-600"
                             }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
