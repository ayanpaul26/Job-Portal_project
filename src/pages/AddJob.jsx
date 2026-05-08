import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-md flex flex-col gap-6">
      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-800">
          Job Title
        </p>

        <input
          type="text"
          placeholder="Type Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-800">
          Job Description
        </p>

        <div
          ref={editorRef}
          className="bg-white border border-gray-300 rounded-lg"
          style={{ height: "200px" }}
        ></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-12">
        <div>
          <p className="mb-2 text-gray-800 font-medium">
            Job Category
          </p>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
          >
            {JobCategories &&
              JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-gray-800 font-medium">
            Job Location
          </p>

          <select
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
          >
            {JobLocations &&
              JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-gray-800 font-medium">
            Job Level
          </p>

          <select
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
          >
            <option value="Beginner level">
              Beginner level
            </option>

            <option value="Intermediate level">
              Intermediate level
            </option>

            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-gray-800 font-medium">
          Job Salary
        </p>

        <input
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          placeholder="2500"
          className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-black hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 w-fit"
      >
        ADD JOB
      </button>
    </form>
  );
};

export default AddJob;