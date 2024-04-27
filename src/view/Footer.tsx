import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="footer">
            <span>Streetcat Identifier</span><Link className="footlink" to={"/about"}>About</Link>
        </footer>
    )
}