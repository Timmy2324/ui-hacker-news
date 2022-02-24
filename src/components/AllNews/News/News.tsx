import React, {memo, useEffect, useState} from 'react';
import {getSelectedNews} from "../../../api/hackerNewsApi";
import {NavLink, useRouteMatch} from 'react-router-dom';
import {ItemType} from "../../../types/ItemType";
import {Card, CardContent, Grid} from "@mui/material";
import style from './News.module.css';

type NewsPropsType = {
    newsId: number,
}

export const News: React.FC<NewsPropsType> = memo(function News(props: NewsPropsType) {
    const {url} = useRouteMatch();

    const [news, setNews] = useState<ItemType | null>();

    useEffect(() => {
        getSelectedNews(String(props.newsId)).then(response => {
            setNews(response.data);
        });
        return () => setNews(null);
    }, []);

    return (
        <Grid item xs={12}>
            {news ?
                <Card variant="outlined">
                    <NavLink className={style.link} to={`${url}/${news?.id}`}>
                        <CardContent>
                            <div>
                                <Grid container>
                                    <Grid item xs={9} sm={10} md={11}>
                                        <h2 className={style.title}>{news.title}</h2>
                                    </Grid>
                                    <Grid item xs={3} sm={2} md={1}>
                                        <p className={style.score}>score: {news.score}</p>
                                    </Grid>
                                </Grid>

                                <p className={style.text}>By: {news.by}</p>
                                {news.time && <p className={style.text}>Publication
                                    date: {new Date(news.time * 1000).toLocaleDateString()} {new Date(news.time * 1000).toLocaleTimeString()}</p>}
                            </div>
                        </CardContent>
                    </NavLink>
                </Card>
                : ''}
        </Grid>

    );
});