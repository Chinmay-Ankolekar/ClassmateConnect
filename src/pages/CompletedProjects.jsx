import React, { useState, useEffect } from "react";
import supabase from "../supabase/Supabase";
import { useNavigate } from "react-router-dom";

const CompletedProjects = ({ token }) => {
  let navigate = useNavigate();
  const [user_id, setUser_id] = useState(null);
  const [projects, setProjects] = useState([]);
  const [Allprojects, setAllProjects] = useState([]);

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
  getUsers();

  const getProjects = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("project")
        .select("*")
        .or(
          `mem_id1.eq.${user_id},mem_id2.eq.${user_id},mem_id3.eq.${user_id},mem_id4.eq.${user_id}`
        )
        .eq("completed", true);
      if (error) throw error;

      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProjects = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("project")
        .select("*")
        .or(
          `mem_id1.eq.${user_id},mem_id2.eq.${user_id},mem_id3.eq.${user_id},mem_id4.eq.${user_id}`
        );
      if (error) throw error;
      setAllProjects(data);
    } catch (err) {
      console.log(err);
    }
  };
  //   getProjects(user_id);
  useEffect(() => {
    if (user_id) {
      getProjects(user_id);
      getAllProjects(user_id);
    }
  }, [user_id]);

  return (
    <>
      {Allprojects.length === 0 ? (
        <>
          <br />
          <h1 className="lg:ml-10 ml-3 text-xl font-bold text-gray-800">
            No Projects Created!!
            <br />
            Create a project by clicking on the above button
          </h1>
        </>
      ) : (
        <>
          {projects.length === 0 ? (
            <div>
              <br />
              <h1 className="lg:ml-10 ml-3 text-xl font-bold text-gray-800">
                No Projects Completed!!
              </h1>
            </div>
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
                    <div className="mt-2 text-gray-500 overflow-y-auto h-32">
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
                      onClick={() =>
                        navigate(`/productdetails/${project.p_id}`)
                      }
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
      )}
    </>
  );
};

export default CompletedProjects;
