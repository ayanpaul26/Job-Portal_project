import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
// import JobCard from "../components/JobCard";
// import JobCard from "../components/JobCard"
import Joblisting from "../components/Joblisting";
import Navbar from "../components/Navbar";
import Applyjob from "./Applyjob";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Joblisting />
      <AppDownload />
      <Footer />
      <Applyjob/>
      {/* <JobCard/> */}
    </div>
  );
};

export default Home;
