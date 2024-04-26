import { useState, useEffect } from "react";
import { FeederData, CatData, CatType } from "../Types";
import { getCatUrl, fetchCatList, fetchCatData, fetchFeederData } from "../fetchUtils";
import { Link } from "react-router-dom";
import { CatImage } from "./CatImage";
import { Helmet } from "react-helmet-async";
import { Divider } from "./Divider";


function processCatDataToTableImages(catData: CatData, which: keyof CatData["img"]) {
    {
        const src = catData.img[which];
        if (src) {
            const url = getCatUrl(catData, src);
            return <CatImage src={url} />
        }
        else {
            return <div className='centered'>/</div>
        }
    }
}

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

    const [feederData, setFeederData] = useState<FeederData>()
    const [catDataList, setCatDataList] = useState<CatData[]>()
    const [filterType, setFilterType] = useState<CatType>(CatType.None)

    useEffect(() => {
        const feeder = props.feeder;
        fetchFeederData(feeder).then((res) => setFeederData(res));
        getCats(feeder).then(res => setCatDataList(res))
    }, [])

    const helmet = feederData ?
        <Helmet>
            <title>Streetcat Identifier - {feederData?.name}</title>
            <meta name="description" content={`Identify the cats at ${feederData?.name}`} />
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
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Front</td>
                            <td>Back</td>
                            <td>Eating</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.sort(Sort.Alphabetically).map((d) => <tr key={d.__cat}>
                            <td><Link to={`/${d.__feeder}/${d.__cat}`}>{d.name}</Link></td>
                            <td>{processCatDataToTableImages(d, "front")}</td>
                            <td>{processCatDataToTableImages(d, "back")}</td>
                            <td>{processCatDataToTableImages(d, "eating")}</td>
                        </tr>)}
                    </tbody>
                </table>
            </>
        )
    }
    else return <div>Loading...</div>
}

export default Identifier;