import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";
import { Link, useNavigate } from "react-router-dom";

const ProjectCard = ({ token }) => {
  let navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [user_id, setUser_id] = useState(null);

  const getUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", token.user.email);
      if (error) throw error;
      setUser_id(data[0].id);
      return data[0].id;
    } catch (err) {
      console.log(err);
    }
  };

  // const getAllUsersFormatted = async () => {
  //   try {
  //     const { data, error } = await supabase.from("users").select("*");
  //     if (error) throw error;
  //     const formattedUsers = data.map((user) => ({ [user.id]: user.fullname }));
  //     let Allusers = formattedUsers;
  //     console.log(Allusers);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getAllUsersFormatted = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      const formattedUsers = data.reduce((acc, user) => {
        acc[user.id] = user.fullname;
        return acc;
      }, {});
      console.log(formattedUsers);
      setUsers(formattedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const getProjects = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("project")
        .select("*")
        .or(
          `mem_id1.eq.${user_id},mem_id2.eq.${user_id},mem_id3.eq.${user_id},mem_id4.eq.${user_id}`
        );
      getAllUsersFormatted();
      if (error) throw error;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers().then((userId) => {
      if (userId) {
        getProjects(userId).then((projectsData) => {
          setProjects(projectsData);
        });
      }
    });
  }, [token]);
  console.log(projects);

  return (
    <>
      {/* {projects.length === 0 ? (
        <h1>No Projects</h1>
      ) : (
        projects.map((project, index) => {
          return (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{project.p_name}</div>
                <p className="text-gray-700 text-base">{project.p_desc}</p>
              </div>
              <div className="px-6 py-4">
                <div className="px-6 py-4">
                  {Object.keys(project).map((key) => {
                    if (key.startsWith("mem_id") && project[key]) {
                      const userId = parseInt(project[key]);
                      console.log("User ID:", userId);
                      console.log("Users:", users);
                      const userName = users[userId] || "Unknown User";
                      console.log("User Name:", userName);
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
                <button
                  onClick={() => navigate(`/productdetails/${project.p_id}`)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })
      )} */}

      {/* <div className="flex flex-col md:flex-row md:flex-wrap gap-4 lg:m-4">
  <div className="w-full md:w-1/3 ">
    <div className="bg-white border shadow-sm rounded-xl">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800">
          Card title
        </h3>
        <p className="mt-2 text-gray-500">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <button  onClick={() => navigate(`/productdetails/${project.p_id}`)} className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none" href="#">
          Card link
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5">
        <p className="mt-1 text-sm text-gray-500">
        
        </p>
      </div>
    </div>
  </div>
 
</div> */}
      {projects.length === 0 ? (
        <h1>No Projects</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:m-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-white border shadow-sm rounded-xl"
            >
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">
                  {project.p_name}
                </h3>
                <div className="mt-2 text-gray-500 overflow-y-auto h-28">
                  {project.p_desc}
                </div>
              </div>
              <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 absolute bottom-0 left-0 w-full">
                <p className="text-sm text-gray-500">
                  Due date: {project.due_date}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 p-4">
                <button
                  onClick={() => navigate(`/productdetails/${project.p_id}`)}
                  className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Details
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectCard;
