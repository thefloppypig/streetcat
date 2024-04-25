import { useState, useEffect } from "react";
import { FeederData, CatData } from "./Types";
import { getCatData, getFeederData, getMeta } from "./utils";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { CatImage } from "./CatImage";

export type CatPageProps = {
    feeder: string,
    cat: string,
}

export function CatPage(props: CatPageProps) {

    const { feeder, cat } = props;
    const [feederData, setFeederData] = useState<FeederData>()
    const [catData, setCatData] = useState<CatData>()
    const [files, setFiles] = useState<string[]>();

    useEffect(() => {
        getFeederData(feeder).then((res) => setFeederData(res));
        getCatData(feeder, cat).then(res => setCatData(res))
        getMeta(`/${feeder}/${cat}`).then(res => setFiles(res.files));
    }, []);


    if (catData) {
        return (
            <>
                <h1>{catData.name}</h1>
                <div>Find {catData.name} at <Link to={`/${feederData?.__feeder}`}>{feederData?.name}</Link></div>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>
                        {files
                            ?
                            files.length > 0
                                ?
                                files.map(file => {
                                    if (file.endsWith(".webp")) return <CatImage key={file} src={`/${feeder}/${cat}/${file}`} />
                                })
                                :
                                <div>Empty</div>
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