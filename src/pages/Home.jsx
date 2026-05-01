import Hero from "../components/Hero"
// import JobCard from "../components/JobCard"
import Joblisting from "../components/Joblisting"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <div>
      <Navbar/>
     <Hero/>
     <Joblisting/>
    {/* <JobCard/> */}
    </div>
  )
}

export default Home
