import { Link } from "react-router-dom";

function NavLink(props: { to: string, label: string }) {
    const { to, label } = props;
    return <Link to={to}><span className="navlink">{label}</span></Link>
}

export function Nav() {
    return (
        <nav className="nav">
            <NavLink to={"/"} label="Home" />
            <NavLink to={"/happycanteen"} label="Happy Canteen" />
        </nav>
    )
}