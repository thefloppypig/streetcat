
import { getMeowCameraFileNameData } from "../utils/imageUtils";

interface ImageViewerProps {
}

export default function ImageViewer(_: ImageViewerProps) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const src = urlSearchParams.get("file");
    if (!src) return <div>No Image found!</div>
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