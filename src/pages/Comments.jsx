import { useState, useEffect } from "react";
import supabase from "../supabase/Supabase";

const Comments = ({ project, token }) => {
  const [comments, setComments] = useState([]);
  const [user_id, setUser_id] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
    const [formattedTime, setFormattedTime] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);
  const name = token.user.user_metadata.fullName;
  

  const getUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, fullname")
        .eq("email", token.user.email);
      if (error) throw error;
      setUser_id(data[0].id);
      return data[0].id;
    } catch (err) {
      console.log(err);
    }
  };
  getUsers();

  const postComment = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          p_id: project.p_id,
          user_id: user_id,
          comment_description: comments,
          date: new Date().toLocaleString(),
          user_name: name,
        })
        .single();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(`id,comment_description, date,user_name, users(id, fullname)`)
        .eq("p_id", project.p_id);
        const createdDate = new Date(commentsData.date);
    console.log(createdDate);
    console.log(commentsData.date);
  
  setDay(createdDate.getDate())
  setMonth(createdDate.toLocaleString("default", { month: "short" }))
    setYear(createdDate.getFullYear())
 
    setHours(createdDate.getHours())
    setMinutes(createdDate.getMinutes())
    setSeconds(createdDate.getSeconds())

  // Get the time
  const hours = createdDate.getHours();
  const minutes = createdDate.getMinutes();
  const seconds = createdDate.getSeconds();


  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    setFormattedTime(formattedTime);
      if (error) throw error;
      console.log(data);
      setCommentsData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment();
  };

  useEffect(() => {
    getComments()
  }, [project]);

  



  
  return (
    <>
      <div className="border rounded-lg overflow-hidden m-4 shadow-lg">
        <div className="sticky top-0 z-50  border-b  border-gray-300 bg-white py-5 px-8 text-left text-sm text-gray-800">
          <h4 className="inline-block py-1 text-left font-sans font-semibold normal-case text-2xl">
            Discussion
          </h4>
        </div>
        <div className="flex-grow px-8 pt-8 text-left text-gray-700">
          {commentsData.length === 0 ? (
            <h1 className="m-3 mb-6">No Comments</h1>
          ) : null}
          {commentsData
            .slice() // Create a copy of the array to avoid mutating the original array
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort comments by timestamp in descending order
            .map((comment, index) => (
              <div
                key={index}
                className="mx-auto my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8"
              >
                <span class="inline-block h-6 w-6 bg-gray-100 rounded-full overflow-hidden mr-2">
                  <svg
                    class="h-full w-full text-gray-300"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.62854"
                      y="0.359985"
                      width="15"
                      height="15"
                      rx="7.5"
                      fill="white"
                    />
                    <path
                      d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div className="w-full ">
                  <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                    <h3 className="font-medium">{comment.user_name}</h3>
                    <time className="text-xs" dateTime={comment.date}>
                    <time className="text-xs" dateTime={comment.date}>
  {new Date(comment.date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  })}
</time>
                    </time>
                  </div>
                  <p className="text-sm">{comment.comment_description}</p>
                </div>
              </div>
            ))}
          <form onSubmit={handleSubmit}>
            {project.completed ? null : (
              <div className="mt-4  flex items-start border-t  border-gray-300 sm:p-8 py-4 text-left  text-gray-700">
                <textarea
                  cols="1"
                  rows="1"
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Your Message"
                  className="mr-4 overflow-hidden w-full flex-1 cursor-text resize-none rounded-md bg-white text-sm py-2 sm:py-0 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"
                ></textarea>
                <button
                  type="submit"
                  className="relative inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2"
                >
                  Send
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Comments;
