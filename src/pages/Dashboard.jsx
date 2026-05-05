// import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* navbar for req panale */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img className="max-sm:w-32 cursor-pointer " src={assets.logo} />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome , GreatStack</p>
            <div className="relative group">
              <img
                className=" w-8 border rounded-full"
                src={assets.company_icon}
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-1 bg-white rounded-xl border border-gray-200 shadow-lg text-sm min-w-[140px]">
                  <li className="px-4 py-2 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-200">
                    Logout
                  </li>
                  {/* till done 4:01:23
                  
                  uptill the logo click and go to home */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
