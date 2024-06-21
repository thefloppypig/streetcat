import { getFeederData } from "../src/utils/readFiles";
import { saveApiData } from "./saveApiDataFunction";

const feeder = process.argv[2]
const { id } = await getFeederData(feeder);
if (id) {
    await saveApiData(feeder, id);
}



