import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";
import Comments from "./Comments";

const ProductDetails = ({ token }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [users, setUsers] = useState({});


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
  },[projectId]);

  return (
    <>
      <h1>Product Details</h1>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{project.p_name}</div>
          <p className="text-gray-700 text-base">{project.p_desc}</p>
        </div>
        <div className="px-6 py-4">
          <div className="px-6 py-4">
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
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {project.due_date}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {project.created_at}
          </span>
        </div>
      </div>
      <button
        style={{
          backgroundColor: project.completed ? "green" : "blue", // Change color based on completion status
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "none",
        }}
        onClick={toggleCompletion}
      >
        {project.completed ? "Completed" : "Not Completed"}
      </button>

      <Comments project={project} token={token} />
    </>
  );
};

export default ProductDetails;
