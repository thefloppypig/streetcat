import { useState, useEffect } from "react";
import { FeederData, CatData } from "../Types";
import { fetchCatData, fetchExtGalleryList, fetchFeederData, fetchMeta } from "../fetchUtils";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { CatImage } from "./CatImage";
import { Helmet } from "react-helmet-async";
import { Page404 } from "./Page404";

export type CatPageProps = {
    feeder: string,
    cat: string,
}

export function CatPage(props: CatPageProps) {

    const { feeder, cat } = props;
    const [feederData, setFeederData] = useState<FeederData>()
    const [catData, setCatData] = useState<CatData>()
    const [filesLocal, setFilesLocal] = useState<string[]>();
    const [filesExt, setFilesExt] = useState<string[]>();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchFeederData(feeder).then((res) => setFeederData(res));
        fetchCatData(feeder, cat).then(res => setCatData(res)).catch(()=> setNotFound(true))
        fetchMeta(`${feeder}/${cat}`).then(res => setFilesLocal(res.files));
        fetchExtGalleryList(feeder, cat).then(res => setFilesExt(res));
    }, [feeder, cat]);
    
    if (notFound) return <Page404/>

    if (catData) {
        return (
            <>
                <Helmet>
                    <title>{catData.name} - Streetcat Identifier</title>
                </Helmet>
                <h1>{catData.name}</h1>
                <div>Find {catData.name} at <Link to={`/${feederData?.__feeder}`}>{feederData?.name}!</Link></div>
                <br />
                <div>Check {catData.name} <Link to={`https://streetcat.wiki/index.php/${catData.name.replace(/\s+/g, '_')}`}>Streetcat Wiki page</Link></div>
                <br />
                <h2>Gallery</h2>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 300: 1, 500: 2, 750: 3, 1000: 4, 2000: 6 }}
                >
                    <Masonry>
                        {filesLocal
                            ?
                            filesLocal.length > 0
                                ?
                                getGalleryElements(filesLocal, feeder, cat)
                                :
                                <div>Empty</div>
                            :
                            <div>Loading...</div>}
                        {filesExt
                            ?
                            filesExt.length > 0
                                ?
                                filesExt.map((src, i) => {
                                    return <CatImage key={i} src={src} />
                                })
                                :
                                undefined
                            :
                            <div>Loading...</div>}
                    </Masonry>
                </ResponsiveMasonry>
            </>
        )
    }
    else return (
        <div>Loading...</div>
    )
}

function getGalleryElements(files: string[], feeder: string, cat: string) {
    const elems = [];

    for (let index = files.length - 1; index >= 0; index--) {
        const file = files[index];
        if (file.endsWith(".webp")) elems.push(<CatImage key={file} src={`${feeder}/${cat}/${file}`} />)
    }

    return elems;
}