import { useState } from "react";
import { FeederData, CatData, CatType } from "../shared/Types";
import { fetchFeederData, fetchFeederCatList } from "../utils/fetchUtils";
import { Params, useLoaderData, useParams } from "react-router-dom";
import { Divider } from "../components/Divider";
import { Page404 } from "./Page404";
import { linkMeowCamera, linkWiki } from "../shared/Const";
import IdentifierTable from "./IdentifierTable";
import IdentifierTiles from "./IdentifierTiles";
import { SortCatData } from "../utils";
import { Head } from "vite-react-ssg";

interface IdentifierLoaderData {
    feederData: FeederData,
    catDataList: CatData[]
}

async function getCats(feeder: string) {
    const catList = await fetchFeederCatList(feeder);
    return catList;
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
    const { feederData, catDataList } = useLoaderData() as IdentifierLoaderData;
    if (!(feeder && feederData && catDataList)) return <Page404 />

    const [filterType, setFilterType] = useState<CatType>(CatType.None)
    const [view, setView] = useState<IdentifierViewType>("all");

    const head = feederData ?
        <Head>
            <title>{feederData.name} - Streetcat Identifier</title>
            <meta name="description" content={`Identify the cats at ${feederData.name}`} />
        </Head> : undefined;

    if (catDataList) {
        const filteredList = filterType ? catDataList.filter((d) => d.type === filterType) : catDataList;
        const sortedFilteredList = filteredList.sort(SortCatData.Alphabetically);
        return (
            <>
                {head}
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