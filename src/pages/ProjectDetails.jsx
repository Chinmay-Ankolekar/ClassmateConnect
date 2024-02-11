import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";
import Comments from "./Comments";

const ProductDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const getProjectbyId = async (projectId) => {
    try {
      const { data, error } = await supabase
        .from("project")
        .select("*")
        .eq("p_id", projectId);
      if (error) throw error;
      setProject(data[0]);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(project);
  //getProjectbyId(projectId);
  useEffect(() => {
    getProjectbyId(projectId);
  }, [projectId]);

  return (
    <>
      <h1>Product Details</h1>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
        </div>
      </div>
      <Comments project={project}/>
    </>
  );
};

export default ProductDetails;
