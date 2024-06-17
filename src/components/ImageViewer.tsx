
import { useEffect, useState } from "react";
import { fetchFeederList } from "../utils/fetchUtils";
import { getMeowCameraFileNameData } from "../utils/imageUtils";
import { FeederList } from "../Types";
import { pathToFilename } from "../utils/dataUtils";

interface ImageViewerProps {
}

export default function ImageViewer(_: ImageViewerProps) {
    const [feederList, setFeederList] = useState<FeederList>([])

    const urlSearchParams = new URLSearchParams(window.location.search);
    const src = urlSearchParams.get("file");
    if (!src) return <div>No Image found!</div>
    const filename = pathToFilename(src);
    const data = getMeowCameraFileNameData(filename);
    const feeder = data ? feederList.find((f) => f.id === data.feederId) : undefined

    useEffect(() => {
        fetchFeederList().then((res) => setFeederList(res));
    }, []);

    return (
        <div>
            <img className="imgView" width={1280} height={720} src={src} alt="Streetcat Identifier Image" />
            <h3 className="breakwords">{filename}</h3>
            {data ? <ul>
                <li>Image taken on {data.formattedDate} at {data.formattedTime}</li>
                <li>Image taken at {feeder ? <a href={feeder.__feeder}>{feeder.name}</a> : undefined} feeder with id {data.feederId}</li>
            </ul> : undefined}
        </div>
    )
}