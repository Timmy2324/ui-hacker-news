import React, {useEffect, useState} from 'react';
import {NewsType} from "../../reducers/newsReducer";
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useRouteMatch} from 'react-router-dom';

type NewsPropsType = {
    id: number,
}

export const News: React.FC<NewsPropsType> = (props: NewsPropsType) => {

    const {url} = useRouteMatch();

    const [news, setNews] = useState<NewsType>();

    useEffect(() => {
        getSelectedNews(String(props.id)).then(response => {
            setNews(response.data);
        });
    },[]);


    return (
        <div>
            {news ?
                <div>
                    <NavLink to={`${url}/${news.id}`}>{news.title}</NavLink> score {news.score}
                    <p>by: {news.by}</p>
                    {news.time ? <p>date: {new Date(news.time * 1000).toUTCString()}</p> : ''}
                </div> : ''
            }
        </div>
    );
};