import { useNavigate } from "react-router-dom";

function NavLink(props: { to: string, label: string }) {
    const { to, label } = props;
    const navigate = useNavigate();

    return <button className="navlink" onClick={() => navigate(to)}>{label}</button>;
}

export function Nav() {
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <img className="navicon" src="icon-48.webp" onClick={() => navigate("/")}></img>
            <NavLink to={"/"} label="Home" />
            <NavLink to={"/happycanteen"} label="Happy Canteen" />
        </nav>
    )
}