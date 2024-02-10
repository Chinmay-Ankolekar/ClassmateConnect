import React, { useState } from "react";
import supabase from "../supabase/Supabase";
import { useNavigate } from "react-router-dom";

const CreateProject = ({ token }) => {
  let navigate = useNavigate();
  const [mem_id1, setMem_id1] = useState(null);
  const [mem_id2, setMem_id2] = useState(null);
  const [mem_id3, setMem_id3] = useState(null);
  const [mem_id4, setMem_id4] = useState(null);
  const [due_date, setDue_date] = useState(null);
  const [p_name, setP_name] = useState("");
  const [p_desc, setP_desc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject();
  };

  console.log(p_name, p_desc, mem_id1, mem_id2, mem_id3, mem_id4, due_date);

  async function getUsers() {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", token.user.email);
      setMem_id1(data[0].id);
      if (error) throw error;
    } catch (err) {
      console.log(err);
    }
  }
  getUsers();

  async function createProject() {
    try {
      const { data, error } = await supabase
        .from("project")
        .insert({
          p_name: p_name,
          p_desc: p_desc,
          mem_id1: mem_id1,
          mem_id2: mem_id2,
          mem_id3: mem_id3,
          mem_id4: mem_id4,
          created_at: new Date().toISOString(),
          due_date: due_date,
        })
        .single();
      if (error) throw error;
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="p_name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Project Name
        </label>
        <input
          type="text"
          name="p_name"
          value={p_name}
          onChange={(e) => setP_name(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="p_desc"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Project Description
        </label>
        <input
          type="text"
          name="p_desc"
          value={p_desc}
          onChange={(e) => setP_desc(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mem_id2"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Member 2
        </label>
        <input
          type="text"
          name="mem_id2"
          value={mem_id2}
          onChange={(e) => setMem_id2(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mem_id3"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Member 3
        </label>
        <input
          type="text"
          name="mem_id3"
          value={mem_id3}
          onChange={(e) => setMem_id3(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mem_id4"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Member 4
        </label>
        <input
          type="text"
          name="mem_id4"
          value={mem_id4}
          onChange={(e) => setMem_id4(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="due_date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Due Date
        </label>
        <input
          type="date"
          name="due_date"
          value={due_date}
          onChange={(e) => setDue_date(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Project
        </button>
      </div>
    </form>
  );
};

export default CreateProject;
