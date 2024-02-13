import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/Supabase";
import { useState } from "react";

const Navbar = ({ token }) => {
  let navigate = useNavigate();


  const setStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ status: false })
        .eq("email", token.user.email)
        .select();
      if (error) throw error;

    } catch (err) {
      console.log(err);
    }
  };

  const Logout = () => {
    setStatus();
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <Link
          to="/dashboard"
          className="flex items-center whitespace-nowrap font-bold text-xl text-blue-600"
        >
          <span className=""></span>
          ClassmateConnect .
        </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-5 cursor-pointer lg:hidden"
          htmlFor="navbar-open"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
        >
          <hr className="mt-4 w-full lg:hidden" />
          <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0 ">
            <div className="relative">
              {/* <Link
                to='/profile'
                title="Profile"
                className="flex items-center space-x-2 whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"
              >
                <span className="inline-block h-[2.375rem] w-[2.375rem] bg-gray-100 rounded-full overflow-hidden">
                  <svg
                    className="h-full w-full text-gray-300"
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
                <span>Profile</span>
              </Link> */}
            </div>
            <div className="flex flex-wrap sm:mb-2">
              <div className="flex items-center mr-4">
                <span className="inline-block flex-shrink-0 mb-2 sm:mb-0 h-10 w-10 sm:h-[2.375rem] sm:w-[2.375rem] bg-gray-100 rounded-full overflow-hidden">
                  <svg
                    className="h-full w-full text-gray-300"
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
                <div className="ms-3">
                  <h3 className="font-semibold text-gray-800">
                    {token.user.user_metadata.fullName}
                  </h3>
                  <p className="text-xs font-medium text-gray-600">
                    {token.user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={Logout}
                className="mr-2 rounded-lg border-2 border-blue-700 px-6 py-2 font-medium text-blue-700 transition hover:text-white hover:bg-blue-700"
                style={{ "--button-border-color": "blue" }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
      <hr />
    </>
  );
};

export default Navbar;
