import moment from "moment";
import { CatData } from "../Types";

export function getMeowCameraFileNameData(filename: string) {
    try {
        if (!filename.startsWith("meow.camera")) return;
        const nameSplit = filename.split("_");
        const feederId = nameSplit[1];
        const time = nameSplit[2]?.split(".")[0];//extract time from filename
        let ms = parseInt(time);
        if (!isNaN(ms)) {
            const m = moment(ms);
            const formattedDate = m.format("MMMM Do, YYYY")
            const formattedTime = m.format("HH:MM z")

            return { feederId, formattedDate, formattedTime }
        }
        else return undefined;

    } catch (error) {
        console.warn(error)
        return undefined;
    }
}

export function altText(name: string, which: keyof CatData["img"]) {
    switch (which) {
        case "front":
            return `Front facing image of the cat ${name}`
        case "back":
            return `The back pattern of the cat ${name}`
        case "eating":
            return `${name} eating`
        default:
            return `Image of ${name}`;
    }
}
