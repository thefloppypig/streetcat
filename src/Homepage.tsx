import { Link } from "react-router-dom";

export function Homepage() {
    return (
        <div className="home">
            <h1>Streetcat Indentifier</h1>

            <div>Easily identify the happy canteen cats!</div>
            <Link to={"/happycanteen"}>
                Click to view the happy canteen cats
                <div><img style={{ margin: "auto" }} src="home.webp" /><br /><i>Mr Puke and Mr Sleepy at the Happy Canteen</i></div>
            </Link>

        </div>
    )
}