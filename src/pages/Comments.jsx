import { useState, useEffect } from "react";
import supabase from "../supabase/Supabase";

const Comments = ({project, token}) => {
    const [comments, setComments] = useState([]);
    const [user_id, setUser_id] = useState(null);
    const [commentsData, setCommentsData] = useState([]);
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
        const { data, error } = await supabase.from('comments')
        .insert(
          { 
            p_id: project.p_id,
            user_id: user_id,
            comment_description: comments,
            date: new Date().toISOString(),
            user_name: name
          }
        ).single()
        if (error) throw error
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
  }

    const getComments = async () => {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select(`id,comment_description, date,user_name, users(id, fullname)`)
                .eq('p_id', project.p_id);
            if (error) throw error;
            console.log(data);
         setCommentsData(data);
        } catch (err) {
            console.log(err);
        }
    }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    postComment();
  }

    useEffect(() => {
        getComments();
    }, [project]);

    return ( 
        <>
        <h1>Discussion</h1>
        <div>
            {commentsData.map((comment, index) => {
                return (
                    <div key={index}>
                        <p>{comment.user_name} </p>
                        <p>{comment.comment_description}</p>
                    </div>
                )
            })} 
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="comment" onChange={(e) => setComments(e.target.value)}/>
            <button type="submit">Post</button>
        </form>
        </>
     );
}
 
export default Comments;