import { Link } from "react-router-dom";

export function Homepage() {
    return (
        <div className="home">
            <h1>Streetcat Indentifier</h1>

            <div>Easily identify the happy canteen cats!</div>
            <Link to={"/happycanteen"}>Click to view the happy canteen cats</Link>
        </div>
    )
}