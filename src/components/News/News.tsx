import React, {useEffect, useState} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useRouteMatch} from 'react-router-dom';
import {ItemType} from "../../types/ItemType";
import {Card, CardContent, Grid, Stack} from "@mui/material";
import style from './News.module.css';

type NewsPropsType = {
    id: number,
}

export const News: React.FC<NewsPropsType> = (props: NewsPropsType) => {

    const {url} = useRouteMatch();

    const [news, setNews] = useState<ItemType>();

    useEffect(() => {
        getSelectedNews(String(props.id)).then(response => {
            setNews(response.data);
        });
    }, []);


    return (
        <Grid item xs={12}>
            {news ?
                <Card variant="outlined">
                    <NavLink className={style.link} to={`${url}/${news?.id}`}>
                        <CardContent>
                            <div>
                                <Stack direction="row"  justifyContent="space-between">
                                    <h2 className={style.title}>{news.title}</h2>
                                    <p className={style.score}>score: {news.score}</p>
                                </Stack>
                                <p className={style.text}>By: {news.by}</p>
                                {news.time ? <p className={style.text}>Publication date: {new Date(news.time * 1000).toLocaleDateString()} {new Date(news.time * 1000).toLocaleTimeString()}</p> : ''}
                            </div>
                        </CardContent>
                    </NavLink>
                </Card>
                : ''}
        </Grid>

    );
};
