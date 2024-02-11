import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";
import { Link, useNavigate } from "react-router-dom";

const ProjectCard = ({ token }) => {
  let navigate = useNavigate();
  const [projects, setProjects] = useState([]);
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

  const getProjects = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("project")
        .select("*")
        .or(`mem_id1.eq.${user_id},mem_id2.eq.${user_id},mem_id3.eq.${user_id},mem_id4.eq.${user_id}`);

      console.log(data);
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

  return (
    <>
      {projects.length === 0 ? (
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
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {project.mem_id1}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {project.mem_id2}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {project.mem_id3}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {project.mem_id4}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {project.due_date}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {project.created_at}
                </span>
                {/* <button onClick={() => navigate('/productdetails')}>
                  View
                </button> */}
                <button
                  onClick={() => navigate(`/productdetails/${project.p_id}`)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default ProjectCard;
