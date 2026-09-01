import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import WorkProcess from "../../components/landing/WorkProcess";
import Actions from "../../components/landing/Actions";
import SEO from "../../components/SEO";

const HomePage = () => {
  return (
    <>
      <SEO
        title="TeamTask - Free Project & Task Management"
        description="Manage projects, assign tasks, track progress, and collaborate efficiently with your team using TeamTask."
        path="/"
      />
      
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <Navbar />

        <Hero />

        <Features />

        <WorkProcess />

        <Actions />
      </div>
    </>
  );
};

export default HomePage;
