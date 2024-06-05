import React, { ReactNode } from "react";
import { CatImage } from "./CatImage";
import { CatData } from "../Types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { feederRootProd } from "../Const"

interface CatPageProps {
    filesLocal: string[]
    filesExt: string[]
    catData: CatData
}

export default function CatPage(props: CatPageProps) {
    const { catData, filesLocal, filesExt } = props;

    return <>
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 500: 2, 750: 3, 1000: 4, 2000: 6 }}
        >
            <Masonry>
                {getGalleryElements(filesLocal, catData)}
                {getExtGalleryElements(filesExt, catData)}
            </Masonry>
        </ResponsiveMasonry>
    </>
}


export function getCatUrl(catData: CatData, img: string) {
    return `${feederRootProd}/${catData.__feeder}/${catData.__cat}/${img}`
}

export function getGalleryElements(files: string[], catData: CatData) {
    const elems: ReactNode[] = [];

    for (let index = files.length - 1; index >= 0; index--) {
        const file = files[index];
        if (file.endsWith(".webp")) elems.push(<CatImage className="galleryImg" key={file} src={getCatUrl(catData, file)} alt={`Picture of ${catData.name}`} />)
    }

    return elems;
}

export function getExtGalleryElements(urls: string[] | undefined, catData: CatData) {
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
