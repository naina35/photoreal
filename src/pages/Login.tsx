import { useState } from "react";
import { useAppSelector,useAppDispatch } from "../hooks/useAppDispatch";
import { login } from "../redux/auth/authSlice";
import { useNavigate } from "react-router";

export default function Login(){
    const dispatch=useAppDispatch();
    const navigate=useNavigate()
    const {loading,error}=useAppSelector((state)=>state.auth)
    const [user,setUser]=useState({
        username:'',
        password:''
    })
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setUser((prevState)=>({
            ...prevState,
            [name]:value,
        }))
    }
    const handleSubmit=async(event:React.SubmitEvent)=>{
        console.log("handle Submit Login");
        event.preventDefault();
        const result=await dispatch(login(user));
        console.log(user);
        if(login.fulfilled.match(result)){
            navigate('/profile');
        }
    }
    return (
    <form onSubmit={handleSubmit}>
        <label>Username: <br/>
        <input type='text' name="username" value={user.username} onChange={handleChange}></input>
        </label> <br/>
        <label>Password: <br/>
        <input type='text' name="password" value={user.password} onChange={handleChange}></input>
        </label> <br/>
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>{loading?'loggin u in ..':'Login'}</button>
    </form>);
}