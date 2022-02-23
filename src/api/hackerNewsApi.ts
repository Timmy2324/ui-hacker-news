import axios from "axios";

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newsUrl = `${baseUrl}newstories.json`;
export const selectedNewsUrl = `${baseUrl}item/`;

export const getAllNews = async () => {
    return await axios.get(newsUrl);
}

export const getSelectedNews = async (newsId: string) => {
    return await axios.get(`${selectedNewsUrl + newsId}.json`);
}