import { Link } from "react-router-dom"

export default function Tools() {
    return (
        <div>
            <h1>Tools</h1>
            <div>Random tools for street cat related things</div>
            <Link to={"/tools/checker"} className="toolListItem">
                <h3>Meow.camera file checker</h3>
                <div>Get the date+time from the filename</div>
            </Link>
        </div>
    )
}