import { Link } from "react-router-dom";
import { linkGithub } from "../shared/Const";

export function Footer() {
    return (
        <footer className="footer">
            <span>Streetcat Identifier</span>
            <Link className="footlink" to={"/about"}>About</Link>
            <Link className="footlink" to={"/tools"}>Tools</Link>
            <a className="footlink" href={linkGithub}>Github</a>
        </footer>
    )
}