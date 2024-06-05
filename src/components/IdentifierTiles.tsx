import { IoLink } from "react-icons/io5";
import { CatWarningIcon } from "./CatWarningIcon";
import { CatData, CatImgType } from "../Types";
import { CatImage } from "./CatImage";
import { getCatUrl } from "../utils/fetchUtils";
import { altText } from "../utils/imageUtils";
import { ReactNode } from "react";
import { CatUnseeableIcon } from "./CatUnseeableIcon";
import React from "react";

interface IdentifierTableProps {
    which: CatImgType;
    catDatList: CatData[];
    tilesPerRow: number;
}

export default function IdentifierTiles(props: IdentifierTableProps) {
    const { tilesPerRow } = props;
    return (
        <table className="idTable">
            <colgroup>
                <col span={tilesPerRow} className="identifierCol" />
            </colgroup>
            <tbody>
                {createTileTableContent(props)}
            </tbody>
        </table>
    )
}

function createTileTableContent(props: IdentifierTableProps) {
    const { catDatList, which, tilesPerRow } = props;

    const trList: ReactNode[] = [];
    let tdList: ReactNode[] = [];

    for (let index = 0; index < catDatList.length; index++) {
        const catData = catDatList[index];
        const src = catData.img[which];

        tdList.push(
            <td className="idTile" key={index}>
                <a className="a" href={`/${catData.__feeder}/${catData.__cat}`}>
                    {catData.name}
                    {catData.unknown || catData.unseeable || <IoLink />}
                    {catData.unseeable && <CatUnseeableIcon />}
                    {catData.unknown && <CatWarningIcon />}
                </a>
                {
                    src ? <CatImage width={640} height={360} className='identifierImg' src={getCatUrl(catData, src)} alt={altText(catData.name, which)
                    } />
                        :
                        <div className='centered' > /</div >}
            </td>
        )

        if (tdList.length >= tilesPerRow) {
            trList.push(
                <tr key={index}>
                    {tdList}
                </tr>
            )
            tdList = [];
        }
    }
    if (tdList.length > 0) {
        trList.push(
            <tr key={-1}>
                {tdList}
            </tr>
        )
    }
    return trList;

}