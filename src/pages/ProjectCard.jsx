import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const { data, error } = await supabase.from("project").select("*");
      setProjects(data);
      if (error) throw error;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);


  return (
    <>
      {projects.map((project, index) => {
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
                {project.due_date}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {project.created_at}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProjectCard;
