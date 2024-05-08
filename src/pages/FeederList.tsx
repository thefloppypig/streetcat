import { useEffect, useState } from "react";
import { fetchFeederList } from "../utils/fetchUtils";
import { Page404 } from "./Page404";
import { FeederList } from "../shared/Types";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function FeederListView() {
    const [feederList, setFeederList] = useState<FeederList>()
    const [notFound, setNotFound] = useState(false);

    if (notFound) return <Page404 />

    useEffect(() => {
        fetchFeederList().then((res) => setFeederList(res)).catch(() => setNotFound(true));
    }, []);

    if (feederList) {
        return (
            <div>
                <Helmet>
                    <title>List of Feeders - Streetcat Identifier</title>
                    <meta name="description" content={`List of feeders in Streetcat Identifier`} />
                </Helmet>
                <h1>List of Feeders</h1>
                <ul>
                    {feederList.map((feederData) => {
                        const { __feeder, name } = feederData;
                        return <li key={__feeder}>
                            <Link className="toolListItem" to={`/${__feeder}`}>{name}</Link>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
    else return <Loading></Loading>
}