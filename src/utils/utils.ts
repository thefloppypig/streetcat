import { CatData } from "../Types";


export const SortCatData = {
    Alphabetically: (a: CatData, b: CatData) => a.__cat.localeCompare(b.__cat),
}

export function addQueryParam(key: string, value: string) {
    if (history.pushState) {
        // Get the current URL
        let url = new URL(location.toString());

        // Add or update the query parameter
        url.searchParams.set(key, value);

        // Update the URL without reloading the page
        history.pushState({}, '', url);
    }
}