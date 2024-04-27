import { useState, useEffect } from "react";
import { FeederData, CatData, CatType } from "../Types";
import { getCatUrl, fetchCatList, fetchCatData, fetchFeederData } from "../fetchUtils";
import { Link } from "react-router-dom";
import { CatImage } from "./CatImage";
import { Helmet } from "react-helmet-async";
import { Divider } from "./Divider";
import { Page404 } from "./Page404";


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

const Sort = {
    Alphabetically: (a: CatData, b: CatData) => a.__cat.localeCompare(b.__cat),
}

export type IdentifierProps = {
    feeder: string,
}

export function Identifier(props: IdentifierProps) {
    const { feeder } = props;
    const [feederData, setFeederData] = useState<FeederData>()
    const [catDataList, setCatDataList] = useState<CatData[]>()
    const [filterType, setFilterType] = useState<CatType>(CatType.None)
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
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
        return (
            <>
                {helmet}
                <h1>{feederData?.name ?? ""} Catdentifier</h1>
                <div>
                    Filter:
                    {Object.entries(CatType).map(([k, v]) => {
                        return <span key={v} onClick={() => setFilterType(v)}>
                            <input type="radio" radioGroup="filter" value={v} checked={filterType === v} readOnly />
                            <label >{k}</label>
                        </span>
                    })}
                </div>
                <Divider />
                <table>
                    <colgroup>
                        <col className="identifier1stCol" />
                        <col span={3} width="auto" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Eating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.sort(Sort.Alphabetically).map((d) => <tr key={d.__cat}>
                            <td><Link to={`/${d.__feeder}/${d.__cat}`}>{d.name}</Link></td>
                            {processCatDataToTableImages(d, "front")}
                            {processCatDataToTableImages(d, "back")}
                            {processCatDataToTableImages(d, "eating")}
                        </tr>)}
                    </tbody>
                </table>
            </>
        )
    }
    else return <div>Loading...</div>
}

function processCatDataToTableImages(catData: CatData, which: keyof CatData["img"]) {
    {
        const src = catData.img[which];
        return <>
            <td className="identifierTd" width={1280} height={720}>
                {src ?
                    < CatImage width={1280} height={720} className='identifierImg' src={getCatUrl(catData, src)} />
                    :
                    <div className='centered'>/</div>}
            </td >

        </>
    }
}

export default Identifier;