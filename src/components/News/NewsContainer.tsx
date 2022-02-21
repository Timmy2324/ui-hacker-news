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
            <button>update</button>
            {allNews.map(newsId => <News key={newsId} newsId={newsId}/>)}
        </>

    );
};