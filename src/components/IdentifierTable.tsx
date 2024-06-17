import { IoLink } from "react-icons/io5";
import { CatWarningIcon } from "./CatWarningIcon";
import { CatData } from "../Types";
import { altText } from "../utils/imageUtils";
import { CatImage } from "./CatImage";
import { getCatUrl } from "../utils/fetchUtils";
import { CatUnseeableIcon } from "./CatUnseeableIcon";
import React from "react";
import { IdentifierIconSizesType } from "./Identifier";

interface IdentifierTableProps {
    catDatList: CatData[]
    iconSize: IdentifierIconSizesType
}


export default function IdentifierTable(props: IdentifierTableProps) {
    const { catDatList, iconSize } = props;
    const { first, col } = identifierWidth(iconSize)

    return (
        <table className="idTable">
            <colgroup>
                <col style={first} />
                <col style={col} span={3} />
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
                {catDatList.map((d) => <tr key={d.__cat}>
                    <td>
                        <a className="a idLink" href={`/${d.__feeder}/${d.__cat}`}>
                            <div>
                                {d.name}
                                {d.unknown || d.unseeable || <IoLink />}
                                {d.unseeable && <CatUnseeableIcon />}
                                {d.unknown && <CatWarningIcon />}
                            </div>
                        </a>
                    </td>
                    {processCatDataToTableImages(d, "front")}
                    {processCatDataToTableImages(d, "back")}
                    {processCatDataToTableImages(d, "eating")}
                </tr>)}
            </tbody>
        </table>
    )
}

function identifierWidth(iconSize: IdentifierIconSizesType) {
    switch (iconSize) {
        case "small":
            return { first: { width: "auto" }, col: { width: "17%" } }
        case "medium":
            return { first: { width: "auto" }, col: { width: "22%" } }
        default://large
            return { first: { width: "auto" }, col: { width: "30%" } }
    }
}

function processCatDataToTableImages(catData: CatData, which: keyof CatData["img"]) {
    const src = catData.img[which];
    return <>
        <td className="identifierTd" >
            {
                src ?
                    <CatImage width={640} height={360} className='identifierImg' src={getCatUrl(catData, src)} alt={altText(catData.name, which)
                    } />
                    :
                    <div className='centered' > /</div >}
        </td >
    </>
}