import React, {useEffect, useState} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {useParams} from "react-router-dom";
import {NewsType} from "../../reducers/newsReducer";


export const SelectedNews = () => {

    const params = useParams<{newsId: string}>();
    const [news, setNews] = useState<NewsType>();

    useEffect(() => {
        getSelectedNews(params.newsId).then(response => {
            response.data.url && setNews(response.data);
        });
    }, []);

    return (
        <div>
            {news && news.url ?
                <div>
                    <p><a href={news.url}>{news.url}</a></p>
                    <p>{news.title}</p>
                    {news.time ? <p>date: {new Date(news.time * 1000).toUTCString()}</p> : ''}
                    <p>by: {news.by}</p>
                    <p>comments count: {news.descendants}</p>
                    <p>comments: to do</p>
                </div> : ''
            }
        </div>
    );
};