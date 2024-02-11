import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";
import Comments from "./Comments";
import Navbar from "./Navbar";

const ProductDetails = ({ token }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [users, setUsers] = useState({});
  const [createdBy, setCreatedBy] = useState("");

  const getProjectbyId = async (projectId) => {
    try {
      const { data, error } = await supabase
        .from("project")
        .select("*")
        .eq("p_id", projectId);
      if (error) throw error;
      setProject(data[0]);
      getAllUsersFormatted();
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsersFormatted = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      const formattedUsers = data.reduce((acc, user) => {
        acc[user.id] = user.fullname;
        return acc;
      }, {});

      setUsers(formattedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCompletion = async () => {
    try {
      console.log(project.completed);
      const { data, error } = await supabase
        .from("project")
        .update({ completed: !project.completed })
        .eq("p_id", projectId)
        .select();
      window.location.reload();
      console.log("Update data:", data);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  //getProjectbyId(projectId);
  useEffect(() => {
    getProjectbyId(projectId);
  }, [projectId]);

  // Assuming project.created_at is a timestamp
  const date = new Date(project.created_at);

  // Get the date, month, and year separately
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Get the time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();


  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <>
      <Navbar />
      <div class="">
  <div class="mx-auto max-w-screen-lg px-3 py-10 space-y-3">
    <h5 class="text-sm font-medium uppercase text-gray-400 mb-0">
      Project Details of {project.p_name}
    </h5>
    <h1 class="text-3xl font-semibold mb-0">
      Project Name: {project.p_name}
    </h1>
    <p class="mb-0">Project Description: {project.p_desc}</p>

    <ul class="sm:flex items-center text-sm text-gray-500 mb-0">
      <li>
        Created by{" "}
        <span class="font-bold">
          {Object.keys(project).map((key) => {
            if (key === "mem_id1" && project[key]) {
              const userId = parseInt(project[key]);
              const createdBy = users[userId] || "Loading...";

              return (
                <span
                  key={key}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  {createdBy}
                </span>
              );
            }
            return null;
          })}
        </span>
      </li>
      <span class="hidden sm:inline mx-3 text-2xl">·</span>
      <li>
        Created on {day} {month} {year} at {formattedTime}
      </li>
    </ul>
    <div className="mb-0">
      Team Members:
      {Object.keys(project).map((key) => {
        if (key.startsWith("mem_id") && project[key]) {
          const userId = parseInt(project[key]);
          const userName = users[userId] || "Loading...";

          return (
            <span
              key={key}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              {userName}
            </span>
          );
        }
        return null;
      })}
    </div>
    <button
      type="button"
      className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent ${
        project.completed ? "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-200 text-teal-900 hover:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none hover:text-teal-500 focus:outline-none focus:ring-1 focus:ring-gray-600" : "bg-blue-600 text-white"
      } hover:bg-opacity-75 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600`}
      onClick={toggleCompletion}
      disabled={project.completed}
    >
      {project.completed ? "Completed" : "Not Completed"}
    </button>

    <Comments project={project} token={token} />
  </div>
</div>


{/* 
      <button
        style={{
          backgroundColor: project.completed ? "green" : "blue", 
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "none",
        }}
        onClick={toggleCompletion}
      >
        {project.completed ? "Completed" : "Not Completed"}
      </button> */}

      
    </>
  );
};

export default ProductDetails;
