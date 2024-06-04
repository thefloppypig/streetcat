import { FeederList } from "../shared/Types";
import Loading from "../components/Loading";
import { Link, useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";

export default function FeederListView() {
    const feederList = useLoaderData() as FeederList

    if (feederList) {
        return (
            <div>
                <Head>
                    <title>List of Feeders - Streetcat Identifier</title>
                    <meta name="description" content={`List of feeders in Streetcat Identifier`} />
                </Head>
                <h1>List of Feeders</h1>
                <div>
                    {feederList.map((feederData) => {
                        const { __feeder, name } = feederData;
                        return <Link key={__feeder} className="aNone" to={`/${__feeder}`}>
                            <div className="feederListItem" >
                                {name}
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        )
    }
    else return <Loading></Loading>
}