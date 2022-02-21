import React, {useEffect, useState} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";

type NewsPropsType = {
    newsId: string,
}

type NewsType = {
    by: string,
    descendants: number,
    id: number,
    kids: Array<number>,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string,

}

export const News = ({newsId}: NewsPropsType) => {

    const [news, setNews] = useState<NewsType>();

    useEffect(() => {
        getSelectedNews(newsId).then(data => data.url && setNews(data));
    },[]);

    return (
        <>
            {news && news.url ?
            <div>
                <a href={news.url}>{news.title}</a> score {news.score}
                <p>by: {news.by}</p>
                <p>date: {new Date(news.time * 1000).toUTCString()}</p>
            </div> : ''
            }
        </>
    );
};