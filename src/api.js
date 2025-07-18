const APIKEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

if (!APIKEY) {
    console.warn('REACT_APP_API_KEY is missing! Check your .env file.');
}

export async function getNews() {
    try {
        const response = await fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${APIKEY}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return { articles: [] };
    }
}

export async function getSearchNews(query) {
    try {
        const response = await fetch(`${BASE_URL}/everything?q=${query}&apiKey=${APIKEY}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return { articles: [] };
    }
}