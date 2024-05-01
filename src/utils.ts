import { CatData } from "./types/Types";


export const SortCatData = {
    Alphabetically: (a: CatData, b: CatData) => a.__cat.localeCompare(b.__cat),
}
