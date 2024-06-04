import { Link } from "react-router-dom";
import { useWindowSize } from "../utils/reactUtils";

interface NavLinkProps { to: string, label: string }


function NavLink(props: NavLinkProps) {
    const { to, label } = props;

    const [windowWidth] = useWindowSize()
    const ref = (r: HTMLAnchorElement) => {
        if (r) {
            const rect = r.getBoundingClientRect();
            r.style.visibility = (rect.right > windowWidth) ? "hidden" : "visible"
        }
    }

    return <Link
        to={to}
        className="navlink"
        ref={ref}
    >
        {label}
    </Link>;
}

export function Nav() {

    return (
        <nav className="nav">
            <Link to={"/"}><img className="navicon" src="icon-128.webp" alt="Home" height={40} width={40}></img></Link>
            <NavLink to={"/list"} label="Feeder List" />
            <NavLink to={"/happycanteen"} label="Happy Canteen" />
            <NavLink to={"/lucky711-ii"} label="Lucky 7-11 Ⅱ" />
            <NavLink to={"/auspiciousrestaurant"} label="Auspicious Restaurant" />
            <NavLink to={"/catmojo"} label="CatMojo" />
        </nav>
    )
}