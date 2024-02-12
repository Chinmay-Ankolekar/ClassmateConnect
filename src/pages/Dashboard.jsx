import { useNavigate, Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import Navbar from "./Navbar";
import supabase from "../supabase/Supabase";
import { useEffect } from "react";

const Dashboard = ({ token }) => {
  let navigate = useNavigate();
  
  const setStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ status: true })
        .eq("email", token.user.email)
        .select()
      if (error) throw error;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect (() => {
    setStatus();
  }, [])

  return (
    <>
      <Navbar token={token} />
      <header className="mt-6 mb-12 lg:ml-10 m-4">
        <p className="mb-2 text-sm font-semibold text-blue-600">
          Starter Pages & Examples
        </p>
        <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
          Application Layout: Sidebar using Tailwind CSS
        </h1>
        <p className="mt-2 text-lg text-gray-800">
          This is a simple application layout with sidebar and header examples
          using Tailwind CSS.
        </p>
        <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <Link
            className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            to="/createproduct"
          >
            Create Project
          </Link>
        </div>
      </header>

     
      <hr />

      <div class="lg:ml-5 mx-auto">
        <div class="bg-white py-2 px-3">
          <nav class="flex flex-wrap gap-4 justify-between lg:justify-start lg:mr-0 lg:ml-auto">
            <a
              href="#"
              class="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out"
            >
              {" "}
              Orders{" "}
            </a>

            <a
              href="#"
              class="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
            >
              {" "}
              Account{" "}
            </a>

            <a
              href="#"
              class="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
            >
              {" "}
              Settings{" "}
            </a>
          </nav>
        </div>
      </div>

      <ProjectCard token={token} />
    </>
  );
};

export default Dashboard;
