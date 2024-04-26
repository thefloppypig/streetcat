import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Homepage() {
    return (
        <div className="home">
            <Helmet>
                <title>Streetcat Identifier - Home</title>
            </Helmet>
            <h1>Streetcat Identifier</h1>

            <div>Easily identify the happy canteen cats!</div>

            <div>
                <Link to={"/happycanteen"}>
                    View the happy canteen cats!
                    <br />
                    <img style={{ margin: "auto", maxWidth: "100%" }} src="home.webp" />
                </Link>
                <br />
                <i>Mr Puke and Mr Sleepy at the Happy Canteen</i>
            </div>

        </div>
    )
}