import { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";

const ProjectCard = ({token}) => {
  const [projects, setProjects] = useState([]);
  const [user_id, setUser_id] = useState(null);

 console.log(token);

//  const getUsers = async () => {
//     try {
//       const { data, error } = await supabase.from("users").select("id").eq("email", token.user.email);
//       if (error) throw error;
//       console.log(data[0].id);
//      setUser_id(data[0].id);
//      console.log('here');
//      getProjects();
//     } catch (err) {
//       console.log(err);
//     }
//   }
  
//   const getProjects = async () => {
//     try {
//       const { data, error } = await supabase.from("project").select("*").eq("mem_id1", user_id)
//       console.log(data);
//       setProjects(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   useEffect(() => {
//     console.log('inside useeffect');
//     getUsers();
//   },[])
  
    const getUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("id").eq("email", token.user.email);
        if (error) throw error;
        setUser_id(data[0].id);
        return data[0].id; // Return user_id for chaining
      } catch (err) {
        console.log(err);
      }
    };
  
    const getProjects = async (user_id) => { // Pass userId as parameter
      try {
        const { data, error } = await supabase.from("project").select("*").eq("mem_id1", user_id);
        if (error) throw error;
        return data; // Return projects data for chaining
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getUsers().then(userId => {
        if (userId) {
          getProjects(userId).then(projectsData => {
            setProjects(projectsData);
          });
        }
      });
    }, [token]); // Call useEffect only when token changes
  
    // Render component with projects state
 
  

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
