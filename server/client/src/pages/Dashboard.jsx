import { assets } from "../assets/assets";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* navbar for req panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
          />

          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome , GreatStack</p>

            <div className="relative group">
              <img
                className="w-8 border rounded-full"
                src={assets.company_icon}
              />

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-1 bg-white rounded-xl border border-gray-200 shadow-lg text-sm min-w-[140px]">
                  <li className="px-4 py-2 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-200">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/* left sidebar */}
        <div className="inline-block min-h-screen border-r">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${
                  isActive &&
                  "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${
                  isActive &&
                  "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/manage-job"}
            >
              <img className="min-w-4" src={assets.home_icon} />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${
                  isActive &&
                  "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img
                className="min-w-4"
                src={assets.person_tick_icon}
              />

              <p className="max-sm:hidden">
                View Applications
              </p>
            </NavLink>
          </ul>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;