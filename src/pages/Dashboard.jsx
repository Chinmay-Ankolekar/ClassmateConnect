// import { useNavigate, Link } from "react-router-dom";
// import ProjectCard from "./ProjectCard";
// import Navbar from "./Navbar";
// import supabase from "../supabase/Supabase";
// import { useEffect, useState } from "react";

// const Dashboard = ({ token }) => {
//   let navigate = useNavigate();

//   const setStatus = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("users")
//         .update({ status: true })
//         .eq("email", token.user.email)
//         .select()
//       if (error) throw error;
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect (() => {
//     setStatus();
//   }, [])

//   return (
//     <>
//       <Navbar token={token} />
//       <header className="mt-6 mb-12 lg:ml-10 m-4">
//         <p className="mb-2 text-sm font-semibold text-blue-600">
//           Starter Pages & Examples
//         </p>
//         <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
//           Application Layout: Sidebar using Tailwind CSS
//         </h1>
//         <p className="mt-2 text-lg text-gray-800">
//           This is a simple application layout with sidebar and header examples
//           using Tailwind CSS.
//         </p>
//         <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
//           <Link
//             className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
//             to="/createproduct"
//           >
//             Create Project
//           </Link>
//         </div>
//       </header>

//       <hr />

//       <div class="lg:ml-5 ">
//         <div class="bg-white ">
//           <nav class="flex  gap-4  lg:justify-start lg:mr-0 lg:ml-auto">
//             <button

//               // class="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out"
//               class="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
//             >
//               {" "}
//               All Projects{" "}
//             </button>

//             <a

//               class="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
//             >
//               {" "}
//               Not Completed{" "}
//             </a>

//             <button

//               class="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
//             >
//               {" "}
//               Completed{" "}
//             </button>
//           </nav>
//         </div>
//       </div>
//       <hr />

//       <ProjectCard token={token} />
//     </>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import NotCompletedProjects from "./NotCompletedProjects"; // Import the NotCompleted component
import CompletedProjects from "./CompletedProjects"; // Import the Completed component
import Navbar from "./Navbar";
import supabase from "../supabase/Supabase";
import { useEffect } from "react";

const Dashboard = ({ token }) => {
  const [componentToShow, setComponentToShow] = useState("ProjectCard");

  const handleButtonClick = (component) => {
    setComponentToShow(component);
  };

  const setStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ status: true })
        .eq("email", token.user.email)
        .select();
      if (error) throw error;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setStatus();
  }, []);

  return (
    <>
      <Navbar token={token} />
      <header className="mt-6 mb-12 lg:ml-10 m-4">
        <p className="mb-2 text-sm font-semibold text-blue-600">
          ClassmateConnect
        </p>
        <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
          ClassmateConnect - Collaborative Project Management for Student Teams
        </h1>
        <p className="mt-2 text-lg text-gray-800">
          ClassmateConnect is a dedicated platform designed to foster
          collaboration and streamline project management among student teams in
          college.
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

      <div className="lg:ml-5">
        <div className="bg-white">
          <nav className="flex gap-4 lg:justify-start lg:mr-0 lg:ml-auto">
            <button
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              onClick={() => handleButtonClick("ProjectCard")}
            >
              All Projects
            </button>

            <button
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              onClick={() => handleButtonClick("NotCompleted")}
            >
              Not Completed
            </button>

            <button
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              onClick={() => handleButtonClick("Completed")}
            >
              Completed
            </button>
          </nav>
        </div>
      </div>

      <hr />

      {componentToShow === "ProjectCard" && <ProjectCard token={token} />}
      {componentToShow === "NotCompleted" && (
        <NotCompletedProjects token={token} />
      )}
      {componentToShow === "Completed" && <CompletedProjects token={token} />}
    </>
  );
};

export default Dashboard;
