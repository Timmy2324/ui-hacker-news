import React, {useEffect, useState} from 'react';
import {getAllNews} from "../../api/hackerNewsApi";
import {News} from "./News";

export const NewsContainer = () => {

    const [allNews, setAllNews] = useState([]);

    useEffect(() => {
        getAllNews().then(data => setAllNews(data));
    }, []);

    return (
        <>
            {allNews.map(news => <News key={news} newsId={news}/>)}
        </>

    );
};