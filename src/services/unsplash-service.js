// import { UNSPLASH_ACCESS_KEY } from "../secrets";
import { secrets } from "../secrets";
export const unsplashService = {
    searchUnsplash,
    fetchResults
}

async function searchUnsplash(searchQuery) {
    let sec
    try {
        sec = await secrets
    } catch (err) {
        console.log("couldnt grab secrets");
    }
    const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${sec.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

async function fetchResults(searchQuery) {
    try {
        const results = await searchUnsplash(searchQuery);
        return results;
    } catch (err) {
        console.log(err);
        console.log('Failed to search Unsplash');
    }
}