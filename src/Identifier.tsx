import { useState, useEffect } from "react";
import { FeederData, CatData, FolderMetaData } from "./Types";


async function getFeederData(feeder: string) {
    const response = await fetch(`${feeder}/index.json`);
    const json = await response.json() as FeederData;
    json.__feeder = feeder;
    return json;
}

async function getCatList(feeder: string) {
    const response = await fetch(`${feeder}/meta.json`);
    const json = await response.json() as FolderMetaData;
    return json.dir;
}

async function getCatData(feeder: string, cat: string) {
    const response = await fetch(`${feeder}/${cat}/index.json`);
    const json = await response.json() as CatData;
    json.__cat = cat;
    json.__feeder = feeder;
    return json;
}

function getCatUrl(catData: CatData, img: string) {
    return `${catData.__feeder}/${catData.__cat}/${img}`
}

function processCatDataToTableImages(catData: CatData, which: keyof CatData["img"]) {
    {
        const src = catData.img[which];
        if (src) {
            const url = getCatUrl(catData, src);
            return <img onClick={() => window.open(url)} loading="lazy" className='identifierImg' src={url} />
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
                                <td>{d.name}</td>
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