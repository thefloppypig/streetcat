import { useSearchParams } from "react-router-dom"
import { Page404 } from "./Page404";
import { getMeowCameraFileNameData } from "../utils/imageUtils";

export default function ImageViewer() {
    const [searchParams] = useSearchParams();

    if (!searchParams.has("file")) return <Page404 />

    const src = searchParams.get("file")!;
    const filename = src.replace(/^.*[\\/]/, '');
    const data = getMeowCameraFileNameData(filename);

    return (
        <div>
            <img className="imgView" width={1280} height={720} src={src} alt="Streetcat Identifier Image" />
            <h3 className="breakwords">{filename}</h3>
            {data ? <ul>
                <li>Image taken on {data.formattedDate} at {data.formattedTime}</li>
                <li>Image taken at feeder with id {data.feederId}</li>
            </ul> : undefined}
        </div>
    )
}