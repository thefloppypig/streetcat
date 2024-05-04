import { useState, useEffect } from "react";
import { FeederData, CatData, CatType } from "../shared/Types";
import { getCatUrl, fetchCatList, fetchCatData, fetchFeederData } from "../fetchUtils";
import { Link, useParams } from "react-router-dom";
import { CatImage } from "../components/CatImage";
import { Helmet } from "react-helmet-async";
import { Divider } from "../components/Divider";
import { Page404 } from "./Page404";
import { SortCatData } from "../utils"
import { linkMeowCamera, linkWiki } from "../shared/Const";
import { CatWarningIcon } from "../components/CatWarningIcon";


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

export type IdentifierProps = {
}

export default function Identifier() {

    const { f: feeder } = useParams();
    if (!feeder) return <Page404 />

    const [feederData, setFeederData] = useState<FeederData>()
    const [catDataList, setCatDataList] = useState<CatData[]>()
    const [filterType, setFilterType] = useState<CatType>(CatType.None)
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
                    Filter:
                    {Object.entries(CatType).map(([k, v]) => {
                        return <span className="idRadio" key={v} onClick={() => setFilterType(v)}>
                            <input type="radio" radioGroup="filter" id={`radio-${v}`} value={v} checked={filterType === v} readOnly />
                            <label htmlFor={`radio-${v}`}>{k}</label>
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
                        {filteredList.sort(SortCatData.Alphabetically).map((d) => <tr key={d.__cat}>
                            <td>
                                <Link to={`/${d.__feeder}/${d.__cat}`}>
                                    {d.name}
                                    {d.unknown ? <CatWarningIcon /> : undefined}
                                </Link>
                            </td>
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

function altText(name: string, which: keyof CatData["img"]) {
    switch (which) {
        case "front":
            return `Front facing image of the cat ${name}`
        case "back":
            return `The back pattern of the cat ${name}`
        case "eating":
            return `${name} eating`
        default:
            return `Image of ${name}`;
    }
}

function processCatDataToTableImages(catData: CatData, which: keyof CatData["img"]) {
    {
        const src = catData.img[which];
        return <>
            <td className="identifierTd">
                {src ?
                    < CatImage width={640} height={360} className='identifierImg' src={getCatUrl(catData, src)} alt={altText(catData.name, which)} />
                    :
                    <div className='centered'>/</div>}
            </td >

        </>
    }
}