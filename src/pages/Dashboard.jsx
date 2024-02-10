import { useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  let navigate = useNavigate();
  console.log(token.user.user_metadata);
  return (
    <div>
      <h1>Welcome {token.user.user_metadata.fullName}</h1>
      <button
        onClick={() => {
          sessionStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigate("/createproduct");
        }}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 ml-3"
      >
        Create Project
      </button>
    </div>
  );
};

export default Dashboard;
