import { IoLink } from "react-icons/io5";
import { CatWarningIcon } from "./CatWarningIcon";
import { CatData } from "../Types";
import { altText } from "../utils/imageUtils";
import { CatImage } from "./CatImage";
import { getCatUrl } from "../utils/fetchUtils";
import { CatUnseeableIcon } from "./CatUnseeableIcon";
import React from "react";

interface IdentifierTableProps {
    catDatList: CatData[]
}


export default function IdentifierTable(props: IdentifierTableProps) {
    const { catDatList } = props;

    return (
        <table className="idTable">
            <colgroup>
                <col className="identifier1stCol" />
                <col span={3} className="identifierCol" />
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