const UNSPLASH_ACCESS_KEY = 'yFJdFzQ9D0i1drViCr7KoYTQfGbLGJWszdW_cJ1rg_c'


export const unsplashService = {
    searchUnsplash,
    fetchResults
}

async function searchUnsplash(searchQuery) {
    const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${UNSPLASH_ACCESS_KEY}`;
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