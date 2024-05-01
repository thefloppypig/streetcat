import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <div className="home">
            <Helmet>
                <title>Home - Streetcat Identifier</title>
            </Helmet>
            <h1>Streetcat Identifier</h1>

            <div>Identify the cats on Hello Street Cat livestreams!</div>
            <br />
            <div>View the <Link to={"/list"}>List of Feeders</Link></div>
            <br />
            <div>
                <Link to={"/happycanteen"}>
                    View the happy canteen cats!
                    <br />
                    <img style={{ margin: "auto", maxWidth: "100%", maxHeight: 250 }} src="home.webp" alt="Mr Puke and Mr Sleepy at the Happy Canteen" />
                </Link>
                <br />
                <i>Mr Puke and Mr Sleepy at the Happy Canteen</i>
            </div>

        </div>
    )
}