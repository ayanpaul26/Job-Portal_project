import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecuiterLogin } = useContext(AppContext);
    const {setShowRecruiterLogin} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Step 1 -> Step 2 for Sign Up
    if (state === "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
      return;
    }

    // Final submit logic
    // console.log({
    //   state,
    //   name,
    //   email,
    //   password,
    //   image,
    // });
  };

  useEffect(() =>{
document.body.style.overflow = 'hidden'
return() =>{
  document.body.style.overflow = 'unset'
}
  },[])

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-md rounded-xl bg-white p-10 text-slate-500 shadow-xl"
      >
        {/* Close Button */}
        <img
          onClick={() => setShowRecuiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt="close"
        />

        {/* Heading */}
        <h1 className="text-center text-2xl font-medium text-neutral-700">
          Recruiter {state}
        </h1>

        <p className="mt-2 text-center text-sm">
          Welcome back! Please sign in to continue
        </p>

        {/* Sign Up Step 2 - Upload Logo */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="my-10 flex items-center gap-4">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="w-16 rounded-full"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Company logo"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>

            <p>
              Upload Company <br /> Logo
            </p>
          </div>
        ) : (
          <>
            {/* Company Name */}
            {state === "Sign Up" && (
              <div className="mt-5 flex items-center gap-2 rounded-full border px-4 py-2">
                <img src={assets.person_icon} alt="person icon" />
                <input
                  className="w-full text-sm outline-none"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="mt-5 flex items-center gap-2 rounded-full border px-4 py-2">
              <img src={assets.email_icon} alt="email icon" />
              <input
                className="w-full text-sm outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            {/* Password */}
            <div className="mt-5 flex items-center gap-2 rounded-full border px-4 py-2">
              <img src={assets.lock_icon} alt="lock icon" />
              <input
                className="w-full text-sm outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {/* Forgot Password */}
        {state === "Login" && (
          <p className="mt-4 cursor-pointer text-blue-600">Forgot password?</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {/* Toggle Auth Mode */}
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don&apos;t have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmitted(false);
              }}
            >
              Login
            </span>
          </p>
        )}
        <img  onClick={()=> setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} />
      </form>
    </div>
  );
};

export default RecruiterLogin;