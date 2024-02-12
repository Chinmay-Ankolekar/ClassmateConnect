import React, { useEffect, useState } from "react";
import supabase from "../supabase/Supabase";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

const CreateProject = ({ token }) => {
  let navigate = useNavigate();
  const [mem_id1, setMem_id1] = useState(null);
  const [mem_id2, setMem_id2] = useState(null);
  const [mem_id3, setMem_id3] = useState(null);
  const [mem_id4, setMem_id4] = useState(null);
  const [due_date, setDue_date] = useState(null);
  const [p_name, setP_name] = useState("");
  const [p_desc, setP_desc] = useState("");
  const [users, setUsers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!p_name.trim() || !p_desc.trim())  {
      alert("Please enter project name and description.");
      return;
    }
    if (mem_id2 == '' && mem_id3 == '' && mem_id4 == '' ){
      alert("You must add atleast one member in your team");
      return;
      
    }
    console.log(mem_id1, mem_id2, mem_id3, mem_id4);
    if (mem_id2 == mem_id1 || mem_id3 == mem_id1 || mem_id4 == mem_id1) {
      alert("You Cannot Enter your own ID as a member ID");
      return;
    }

    if(mem_id2 == '' && mem_id3 != '' && mem_id4 != ''){
        setMem_id2(null)
    }
    if(mem_id3 == '' && mem_id4 != '' && mem_id2 != ''){
        setMem_id3(null)
    }
    if(mem_id4 == '' && mem_id2 != '' && mem_id3 != ''){
        setMem_id4(null)
    }

    if (mem_id2 == mem_id1 || mem_id2 == mem_id3 || mem_id2 == mem_id4 ||
      mem_id3 == mem_id1 || mem_id3 == mem_id4 ||
      mem_id4 == mem_id1) {
      alert("Enter All Details Correctly");
      return;
  }
    createProject();
  };

  const getUsername = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", token.user.email);
      console.log(data[0].id);
      if (error) throw error;
      setMem_id1(data[0].id);
      return data[0].id;
    } catch (err) {
      console.log(err);
    }
  };
  getUsername();

  console.log(p_name, p_desc, mem_id1, mem_id2, mem_id3, mem_id4, due_date);

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
          created_at: new Date().toLocaleString(),
          due_date: due_date,
        })
        .single();
      console.log(mem_id1);
      if (error) throw error;
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  const getUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      setUsers(data);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar token={token} />

      <form onSubmit={handleSubmit}>
        <section class="shadow-blue-100 mx-auto max-w-screen-lg rounded-xl bg-white text-gray-600 shadow-lg sm:my-10 sm:border">
          <div class="container mx-auto flex flex-col flex-wrap px-5 pb-2 m-8">
            <div class="flex w-full flex-col">
              <h1 class="text-2xl font-semibold">Add Project</h1>
              <p class="mt-2 text-gray-500">
                Add project details and manage project by discussing them with
                your team members
              </p>
              <div class="mt-4 mb-6 grid items-center gap-3 gap-y-5 sm:grid-cols-4">
                <div class="flex flex-col sm:col-span-3">
                  <label
                    class="mb-1 ml-3 font-semibold text-gray-500"
                    for="breakfast"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="p_name"
                    value={p_name}
                    onChange={(e) => setP_name(e.target.value)}
                    class="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                    placeholder="Enter your Project Name"
                  />
                </div>
                <div class="col-span-1 flex flex-col">
                  <label
                    class="mb-1 ml-3 font-semibold text-gray-500"
                    for="drink1"
                  >
                    Add first Member ID
                  </label>
                  <input
                    type="number"
                    name="mem_id2"
                    value={mem_id2}
                    onChange={(e) => setMem_id2(e.target.value)}
                    class="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                    placeholder="Add Member"
                  />
                </div>
                <div class="flex flex-col sm:col-span-3">
                  <label
                    class="mb-1 ml-3 font-semibold text-gray-500"
                    for="lunch"
                  >
                    Project Description
                  </label>
                  <input
                    type="text"
                    name="p_desc"
                    value={p_desc}
                    onChange={(e) => setP_desc(e.target.value)}
                    class="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                    placeholder="Enter your Project Description"
                  />
                </div>
                <div class="col-span-1 flex flex-col">
                  <label
                    class="mb-1 ml-3 font-semibold text-gray-500"
                    for="drink2"
                  >
                    Add second Member ID
                  </label>
                  <input
                    type="number"
                    name="mem_id3"
                    value={mem_id3}
                    onChange={(e) => setMem_id3(e.target.value)}
                    class="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                    placeholder="Add Member"
                  />
                </div>
                <div class="flex flex-col sm:col-span-3">
                  <label
                    class="mb-1 ml-3 font-semibold text-gray-500"
                    for="dinner"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="due_date"
                    value={due_date}
                    onChange={(e) => setDue_date(e.target.value)}
                    class="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                    placeholder="Enter your Due date"
                  />
                </div>
                <div class="col-span-1 flex flex-col">
                  <label
                    class="mb-1 ml-3 font-semibold text-gray-500"
                    for="drink2"
                  >
                    Add Third Member ID
                  </label>
                  <input
                    type="number"
                    name="mem_id3"
                    value={mem_id4}
                    onChange={(e) => setMem_id4(e.target.value)}
                    class="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
                    placeholder="Add Member"
                  />
                </div>
              </div>

              <div class="flex flex-col justify-between sm:flex-row">
                <Link
                  to="/dashboard"
                  class="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300"
                >
                  Back to HomePage
                </Link>

                <button class="group my-2 flex w-full items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring">
                  Continue
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="group-hover:translate-x-2 ml-4 h-4 w-4 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
      {/* <div className="flex justify-center">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get User Details
        </button>
      </div>

      <div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="font-semibold text-gray-700">User Accounts</h2>
                  <span className="text-xs text-gray-500">
                    View accounts of registered users
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th className="px-5 py-3 w-1/4">ID</th>
                        <th className="px-5 py-3 w-3/4">Full Name</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm w-1/4">
                            <p className="whitespace-no-wrap">{user.id}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm w-3/4">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="whitespace-no-wrap">
                                  {user.fullname}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
       <div className="flex justify-center">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get User Details
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8 bg-white rounded-lg shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="font-semibold text-gray-700">User Accounts</h2>
                <span className="text-xs text-gray-500">
                  View accounts of registered users
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3 w-1/4">ID</th>
                    <th className="px-5 py-3 w-3/4">Full Name</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm w-1/4">
                        <p className="whitespace-no-wrap">{user.id}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm w-3/4">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">
                              {user.fullname}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProject;
