import axios from "axios";

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const newsUrl = `newstories.json`;
const selectedNewsUrl = `item/`;

const instanceNews = axios.create({
    baseURL: baseUrl,
})

export const newsAPI = {
    async getAllNews() {
        return await instanceNews.get(newsUrl);
    },
    async getSelectedNews(newsId: string) {
        return await instanceNews.get(`${selectedNewsUrl + newsId}.json`);
    },
    async getComment(commentId: string) {
        return await instanceNews.get(`${selectedNewsUrl + commentId}.json`);
    },
}