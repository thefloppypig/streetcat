import 'moment-timezone';
import moment from "moment";
import { ReactNode, useEffect, useRef, useState } from "react"
import './ToolFindCst.css'
import { Divider } from '../components/Divider';
import { fetchFeederList } from '../utils/fetchUtils';
import { FeederList } from '../shared/Types';
import { linkWiki } from '../shared/Const';
import { CatWarningIcon } from '../components/CatWarningIcon';

const Timezones = {
    CST: { name: "China Standard Time (LFT - Local Feeder Time) -06:00", tz: "Asia/Shanghai" },
    GMT: { name: "Greenwich Standard time +00:00", tz: "Atlantic/Reykjavik" },
}

export default function ToolFindCst() {
    const [feederList, setFeederList] = useState<FeederList>([])

    const fileUpload = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<FileList | null>();
    const [timezone, setTimezone] = useState<string>(Timezones.CST.tz);
    const elems: ReactNode[] = [];

    useEffect(() => {
        fetchFeederList().then((res) => setFeederList(res));
    }, []);

    if (files) {
        for (const file of files) {
            try {
                const nameSplit = file.name.split("_");
                const feederId = nameSplit[1];
                const feeder = findFeederInList(feederId, feederList);
                const time = nameSplit[2]?.split(".")[0];//extract time from filename
                let ms = parseInt(time);
                let incorrectFormat = false;
                if (!ms || isNaN(ms)) {
                    ms = file.lastModified;
                    incorrectFormat = true;
                };
                const m = moment(ms).tz(timezone);
                const formattedDate = m.format("MMMM Do, YYYY")
                const formattedTime = m.format("HH:MM (z)").replace("CST", "LFT")
                const outVisual = `${formattedDate} - At ${formattedTime}`;
                const outSource = `* '''${formattedDate}:''' At ${formattedTime}`;
                elems.push(<span className='fileItem' key={file.name}>
                    <h4>{file.name}</h4>
                    {incorrectFormat && <div className='warningBox'><CatWarningIcon noTooltip /> The file name is not formatted correctly</div>}
                    <div>This file was {incorrectFormat ? "last modified" : "saved"} at <span className='wikiSource'>{outVisual}</span><button onClick={() => navigator.clipboard.writeText(outVisual)}>Copy</button></div>
                    <div>Wiki Source Text for sighting:<span className='wikiSource'>{outSource}</span><button onClick={() => navigator.clipboard.writeText(outSource)}>Copy</button></div>
                    {!incorrectFormat && <div>Taken in {feeder ? <a href={`${linkWiki}/${feeder.wiki}`}>{feeder.name}</a> : undefined} feeder with id {feederId}</div>}
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
            <div>Simple tool to retrieve the date from the filename of a meow.camera screenshot or clip.</div>
            <div>File names should look like this: <i>meow.camera_4258783365322591678_1714768691754</i></div>
            <div>Select 1 or more files:</div>
            <Divider />
            <input type="file" ref={fileUpload} multiple onChange={(ev) => {
                const files = ev.target.files;
                setFiles(files);
            }}
                onMouseDown={(ev) => {
                    ev.currentTarget.value = "";
                    setFiles(null);
                }} />
            <select value={timezone} onChange={(ev) => setTimezone(ev.target.value)}>
                {Object.entries(Timezones).map(([id, value]) => {
                    return <option key={id} value={value.tz}>{`${id} ${value.name}`}</option>
                })}
            </select>
            <Divider />
            {elems}
        </div>
    )
}

function findFeederInList(id: string, list: FeederList) {
    for (const iterator of list) {
        if (iterator.id === id) return iterator;
    }
}