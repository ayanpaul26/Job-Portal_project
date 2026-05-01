import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const Joblisting = () => {
  const { isSearched, searchFilter, setSearchFilter,jobs } = useContext(AppContext);

  const[showFilter,setShwoFilter] = useState(false)
  return (
    // <div className="container 2xl:px-20  mx-auto flex flex-col lg:space-y-8 py-8">
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row gap-8 py-8">
      {/* side bar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* searrch filter from hero component */}

        { isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className=" ml-2 inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}
              </div>
            </>
          )}

          {/* will resume */}
<button className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
  {showFilter ? "Close":"Filters"}
  {/* 1:34:04 */}
  {/* will resume */}
</button>
        {/* Catogory Filter */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4">Search by Catogories</h4>
          <ul className="space-y-4 text-gray-700">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125" type="checkbox" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* location  Filter */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4 pt-14">Search by Locations</h4>
          <ul className="space-y-4 text-gray-700">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125" type="checkbox" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
       {/* job listings */}

        <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
          <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
          <p className="mb-8">Get your desired job from top companies</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {jobs.map((job,index)=>(
                <JobCard key={index} job={job}/>
              ))}
          </div>
        </section>
    </div>
  );
};

export default Joblisting;
