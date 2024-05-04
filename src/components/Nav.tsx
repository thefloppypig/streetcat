import { Link } from "react-router-dom";

function NavLink(props: { to: string, label: string }) {
    const { to, label } = props;

    return <Link to={to} className="navlink">{label}</Link>;
}

export function Nav() {

    return (
        <nav className="nav">
            <Link to={"/"}><img className="navicon" src="icon-48.webp" alt="Home" height={40} width={40}></img></Link>
            <NavLink to={"/list"} label="Feeders" />
            <NavLink to={"/happycanteen"} label="Happy Canteen" />
        </nav>
    )
}