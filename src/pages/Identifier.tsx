import { useState, useEffect } from "react";
import { FeederData, CatData, CatType } from "../shared/Types";
import { fetchCatList, fetchCatData, fetchFeederData } from "../utils/fetchUtils";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Divider } from "../components/Divider";
import { Page404 } from "./Page404";
import { linkMeowCamera, linkWiki } from "../shared/Const";
import IdentifierTable from "./IdentifierTable";
import IdentifierTiles from "./IdentifierTiles";
import { SortCatData } from "../utils";


async function getCats(feeder: string) {
    const catList = await fetchCatList(feeder);
    const catDataList: CatData[] = [];
    const catDataPromiseList: Promise<CatData>[] = [];
    for (const cat of catList) {
        const promise = fetchCatData(feeder, cat);
        promise.then((res) => catDataList.push(res));
        catDataPromiseList.push(promise);
    }
    await Promise.allSettled(catDataPromiseList);
    return catDataList;
}

const IdentifierViews = {
    all: "All",
    front: "Front Only",
    back: "Back Only",
    eating: "Eating Only",
}

type IdentifierViewType = keyof typeof IdentifierViews;

export type IdentifierProps = {
}

export default function Identifier() {

    const { f: feeder } = useParams();
    if (!feeder) return <Page404 />

    const [feederData, setFeederData] = useState<FeederData>()
    const [catDataList, setCatDataList] = useState<CatData[]>()
    const [filterType, setFilterType] = useState<CatType>(CatType.None)
    const [view, setView] = useState<IdentifierViewType>("all");
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setFeederData(undefined);
        setCatDataList(undefined);
        fetchFeederData(feeder).then((res) => setFeederData(res)).catch(() => setNotFound(true));
        getCats(feeder).then(res => setCatDataList(res)).catch(() => setNotFound(true));
    }, [feeder]);

    if (notFound) return <Page404 />

    const helmet = feederData ?
        <Helmet>
            <title>{feederData.name} - Streetcat Identifier</title>
            <meta name="description" content={`Identify the cats at ${feederData.name}`} />
        </Helmet> : undefined;

    if (catDataList) {
        const filteredList = filterType ? catDataList.filter((d) => d.type === filterType) : catDataList;
        const sortedFilteredList = filteredList.sort(SortCatData.Alphabetically);
        return (
            <>
                {helmet}
                <h1>List of Cats in {feederData?.name ?? ""}</h1>
                <div>
                    <a className="linkButton" href={`${linkWiki}/${feederData?.wiki}`}>Wiki</a>
                    <a className="linkButton" href={`${linkMeowCamera}${feederData?.id}`}>Camera</a>
                </div>
                <Divider />
                <div>
                    View:
                    {Object.entries(IdentifierViews).map(([k, v]) => {
                        return <span className="idRadio" key={v} onClick={() => setView(k as IdentifierViewType)}>
                            <input type="radio" radioGroup="filter" id={`radio-${k}`} value={k} checked={view === k} readOnly />
                            <label htmlFor={`radio-${k}`}>{v}</label>
                        </span>
                    })}
                </div>
                <div>
                    Filter:
                    {Object.entries(CatType).map(([k, v]) => {
                        return <span className="idRadio" key={v} onClick={() => setFilterType(v)}>
                            <input type="radio" radioGroup="filter" id={`radio-${v}`} value={v} checked={filterType === v} readOnly />
                            <label htmlFor={`radio-${v}`}>{k}</label>
                        </span>
                    })}
                </div>
                <Divider />
                {view === "all" ?
                    <IdentifierTable catDatList={sortedFilteredList} />
                    :
                    <IdentifierTiles key={view} tilesPerRow={3} which={view} catDatList={sortedFilteredList} />
                }
            </>
        )
    }
    else return <div>Loading...</div>
}
