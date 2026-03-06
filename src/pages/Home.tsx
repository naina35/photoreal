import { Link } from "react-router";

export default function Home(){

    return (
    <div>
        <button ><Link to="/profile">Profile</Link></button>
        <h1>Home</h1>
    </div>);
}