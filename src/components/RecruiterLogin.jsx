import { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, SetIsTextDataSubmited] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmited) {
      SetIsTextDataSubmited(true);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form  onSubmit={onSubmitHandler} className=" relative bg-white p-10 rounded-xl text-slate-500 shadow-xl w-full max-w-md">
        <h1 className=" text-center text-2xl text-neutral-700 font font-medium">
          Recruiter{state}
        </h1>
        <p className="text-small ml-12">
          Welcome back! Please Sign in to continue
        </p>
        {state === "Sign Up" && isTextDataSubmited ? (
          <> 
          <div className="flex items-center  gap-4 my-10">
            <label>
              <img  className="w-16 rounded-full" src={ image ?URL.createObjectURL(image) : assets.upload_area}/>
              {/* upto this done 3:47:10 */}
              <input onChange={e => setImage(e.target.files[0])} type = "file" id="image" hidden/>
            </label>
            <p>
              Upload Company <br/> logo 
            </p>
          </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} />
              <input
                className="outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="email "
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} />
              <input
                className="outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="password"
                required
              />
            </div>
          </>
        )}
        <p className="text-blue-600 my-4 cursor-pointer">Forgot password</p>
        <button type="submit" className="w-full bg-blue-600 text-white py-1 rounded-full hover:bg-blue-700 transition mt-5">
          {state === "Login" ? "login" : isTextDataSubmited ?  "creat account" : "next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;
