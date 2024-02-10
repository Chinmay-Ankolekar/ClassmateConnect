import { useNavigate } from "react-router-dom";

const Dashboard = ({token}) => {
    let navigate = useNavigate()
    console.log(token.user.user_metadata);
    return (
        <div>
            <h1>Welcome {token.user.user_metadata.fullName}</h1>
            <button onClick={()=>{ sessionStorage.removeItem('token');  navigate('/')} }>Logout</button>
        </div>
    )
}

export default Dashboard;