import { useState, useEffect } from "react";
import { FeederData, CatData } from "./Types";
import { getCatUrl, getCatList, getCatData, getFeederData } from "./utils";
import { Link } from "react-router-dom";
import { CatImage } from "./CatImage";


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
    const catList = await getCatList(feeder);
    const catDataList: CatData[] = [];
    const catDataPromiseList: Promise<CatData>[] = [];
    for (const cat of catList) {
        const promise = getCatData(feeder, cat);
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

    useEffect(() => {
        const feeder = props.feeder;
        getFeederData(feeder).then((res) => setFeederData(res));
        getCats(feeder).then(res => setCatDataList(res))
    }, [])
    return (

        <>
            <h1>{feederData?.name ?? ""} Catdentifier</h1>
            {
                catDataList ?
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
                            {catDataList.sort(Sort.Alphabetically).map((d) => <tr key={d.__cat}>
                                <td><Link to={`/${d.__feeder}/${d.__cat}`}>{d.name}</Link></td>
                                <td>{processCatDataToTableImages(d, "front")}</td>
                                <td>{processCatDataToTableImages(d, "back")}</td>
                                <td>{processCatDataToTableImages(d, "eating")}</td>
                            </tr>)}
                        </tbody>
                    </table>
                    : "Loading..."
            }
        </>
    )
}

export default Identifier;