import 'moment-timezone';
import moment from "moment";
import { ReactNode, useRef, useState } from "react"
import './FindCst.css'

export function FindCst() {
    const fileUpload = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<FileList | null>();
    const elems: ReactNode[] = [];
    if (files) {
        for (const file of files) {
            try {
                const time = file.name.split("_")[2]?.split(".")[0];//extract time from filename
                let ms = parseInt(time);
                let saved = "saved";
                if (!ms || isNaN(ms)) {
                    ms = file.lastModified;
                    saved = "last modified"
                };
                const m = moment(ms).tz("Asia/Shanghai");
                const formattedDate = m.format("MMMM Do, YYYY")
                const formattedTime = m.format("HH:MM z")
                const outVisual = `${formattedDate} - At ${formattedTime}`;
                const outSource = `* '''${formattedDate} -''' At ${formattedTime}`;
                elems.push(<span className='fileItem' key={file.name}>
                    <h4>{file.name}</h4>
                    <div>This file was {saved} at <span className='wikiSource'>{outVisual}</span><button onClick={() => navigator.clipboard.writeText(outVisual)}>Copy</button></div>
                    <div>Wiki Source Text for sighting:<span className='wikiSource'>{outSource}</span><button onClick={() => navigator.clipboard.writeText(outVisual)}>Copy</button></div>

                </span>)
            } catch (error) {
                elems.push(<span key={file.name}>
                    <div>{file.name}</div>
                    <div>Unable to retrieve date</div>
                </span>)
            }
        }
    }

    return (
        <div>
            <h1>Meow.camera file checker</h1>
            <div>Simple tool to retrieve the date from the filename of a meow.camera screenshot or clip</div>
            <div>File names should look like this: <i>meow.camera_4258783365322591678_1714768691754</i></div>
            <div>Select 1 or more files:</div>
            <input type="file" ref={fileUpload} multiple onChange={(ev) => {
                const files = ev.target.files;
                setFiles(files);
            }}
                onMouseDown={(ev) => {
                    ev.currentTarget.value = "";
                    setFiles(null);
                }} />
            {elems}
        </div>
    )
}