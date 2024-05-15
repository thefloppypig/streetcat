import { useState, useEffect, ReactNode } from "react";
import { FeederData, CatData } from "../shared/Types";
import { fetchCatData, fetchExtGalleryList, fetchFeederData, fetchMeta, getCatUrl } from "../utils/fetchUtils";
import { Link, useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { CatImage } from "../components/CatImage";
import { Helmet } from "react-helmet-async";
import { Page404 } from "./Page404";
import { feederRootProd, linkWiki } from "../shared/Const";
import { CatWarningBox } from "../components/CatWarningBox";
import { CatUnseeableBox } from "../components/CatUnseeableBox";

export type CatPageProps = {
}

export default function CatPage() {

    const { f: feeder, c: cat } = useParams();
    if (!feeder || !cat) {
        return <Page404 />;
    }

    const [feederData, setFeederData] = useState<FeederData>()
    const [catData, setCatData] = useState<CatData>()
    const [filesLocal, setFilesLocal] = useState<string[]>();
    const [filesExt, setFilesExt] = useState<string[]>();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchFeederData(feeder).then((res) => setFeederData(res));
        fetchCatData(feeder, cat).then(res => setCatData(res)).catch(() => setNotFound(true))
        fetchMeta(`${feederRootProd}/${feeder}/${cat}`).then(res => setFilesLocal(res.files));
        fetchExtGalleryList(feeder, cat).then(res => setFilesExt(res));
    }, [feeder, cat]);

    if (notFound) return <Page404 />

    if (catData) {
        const { name, features } = catData;
        const names = possessive(name);
        return (
            <>
                <Helmet>
                    <title>{name} - Streetcat Identifier</title>
                </Helmet>
                <h1>{catData.name}</h1>
                {catData.unseeable && <CatUnseeableBox />}
                {catData.unknown && <CatWarningBox />}
                <div>Find {name} at <Link className="a" to={`/${feederData?.__feeder}`}>{feederData?.name}!</Link></div>
                <br />
                <div>Check {names} <Link className="a" to={`${linkWiki}/${name.replace(/\s+/g, '_')}`}>Streetcat Wiki page</Link></div>
                <br />
                {features ? <>
                    <h2>{names} Features</h2>
                    <ul>
                        {features.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                </> : undefined}
                <h2>Gallery</h2>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 300: 1, 500: 2, 750: 3, 1000: 4, 2000: 6 }}
                >
                    <Masonry>
                        {filesLocal
                            ?
                            filesLocal.length > 0
                                ?
                                getGalleryElements(filesLocal, catData)
                                :
                                <div>Empty</div>
                            :
                            <div>Loading...</div>}
                        {getExtGalleryElements(filesExt, catData)}
                    </Masonry>
                </ResponsiveMasonry>
            </>
        )
    }
    else return (
        <div>Loading...</div>
    )
}

function getGalleryElements(files: string[], catData: CatData) {
    const elems = [];

    for (let index = files.length - 1; index >= 0; index--) {
        const file = files[index];
        if (file.endsWith(".webp")) elems.push(<CatImage className="galleryImg" key={file} src={getCatUrl(catData, file)} alt={`Picture of ${catData.name}`} />)
    }

    return elems;
}

function getExtGalleryElements(urls: string[] | undefined, catData: CatData) {
    if (!urls) return <div>Loading...</div>
    else if (urls.length > 0) {
        const elems: ReactNode[] = [];
        urls.forEach((src, i) => {
            if (src.includes("youtube")) {
                elems.push(<iframe key={i} className="galleryIframe" width="100%" height="100%" src={src}></iframe>)
            }
            else {
                elems.push(<CatImage key={i} src={src} alt={`Picture of ${catData.name}`} className="galleryImg" />)
            }
        })
        return elems;
    }
    else return undefined;
}

function possessive(name: string) {
    if (name.endsWith("s")) return `${name}'`;
    else return `${name}'s`
}