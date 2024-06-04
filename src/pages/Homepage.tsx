import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <div className="home">
            <Head>
                <title>Home - Streetcat Identifier</title>
            </Head>
            <img style={{ width: "100%", maxWidth: "500px", height: "auto" }} width={1024} height={500} src="banner.webp" alt="Streetcat Identifier Banner" />

            <h1>Streetcat Identifier</h1>

            <div>Identify the cats on Hello Street Cat livestreams!</div>
            <br />
            <Link className="feederListItem aNone" to={"/list"}>View the List of Feeders!</Link>
            <br />
            <br />
            <Link className="feederListItem aNone" to={"/happycanteen"}>View the happy canteen cats!</Link>
            <br />
            <br />
            <div>
                <Link to={"/happycanteen"}>
                    <img width={491} height={471} style={{ width: "auto", height: "100%", maxHeight: 250, maxWidth: "100%" }} src="home.webp" alt="Mr Puke and Mr Sleepy at the Happy Canteen" />
                </Link>
                <br />
                <i>Ms Puke and Ms Sleepy at the Happy Canteen</i>
            </div>

        </div>
    )
}