import { logout } from "../redux/auth/authSlice"
import { useAppDispatch,useAppSelector } from "../hooks/useAppDispatch"
import { useNavigate } from "react-router";
import { getProfile } from "../redux/profile/profileSlice";
import { useEffect } from "react";
export default function Profile(){
    const dispatch=useAppDispatch();
    const navigate=useNavigate()
    const handleLogout=(event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        event.preventDefault();
        dispatch(logout());
        navigate('/login');
    }
    const {profile,loading,error}=useAppSelector((state)=>state.profile);
    useEffect(()=>{
        if(!profile){
            dispatch(getProfile());
        }
    },[]);
    return <>
    <button onClick={handleLogout}>Logout</button>
    Profile
    <h2>{profile?.username}</h2>
    <h3>bio:{profile?.bio} </h3><button>Edit?</button>
    <h3>pfp:{profile?.pfp}</h3><button>Edit?</button>
    </>
}