import { logout } from "../redux/auth/authSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useNavigate } from "react-router";
export default function Profile(){
    const dispatch=useAppDispatch();
    const navigate=useNavigate()
    const handleLogout=(event:React.MouseEvent<HTMLButtonElement, MouseEvent>
)=>{
        event.preventDefault();
        dispatch(logout());
        navigate('/login');
    }
    return <>
    <button onClick={handleLogout}>Logout</button>
    Profile
    </>
}