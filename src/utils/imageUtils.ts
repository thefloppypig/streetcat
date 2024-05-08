import moment from "moment";

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