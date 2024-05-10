import { Link } from "react-router-dom";
import { IoLink } from "react-icons/io5";
import { CatWarningIcon } from "../components/CatWarningIcon";
import { CatData } from "../shared/Types";
import { altText } from "../utils/imageUtils";
import { CatImage } from "../components/CatImage";
import { getCatUrl } from "../utils/fetchUtils";

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
                        <Link className="a" to={`/${d.__feeder}/${d.__cat}`}>
                            {d.name}
                            {d.unknown ? <CatWarningIcon /> : <IoLink />}
                        </Link>
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