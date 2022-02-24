import React, {useEffect, useState} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useRouteMatch} from 'react-router-dom';
import {ItemType} from "../../types/ItemType";
import {Card, CardContent, Grid, Stack} from "@mui/material";

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
            <Card variant="outlined">
                <NavLink to={`${url}/${news?.id}`}>
                    <CardContent>

                        {news ?
                            <div>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <h2>{news.title}</h2>
                                    <span>score {news.score}</span>
                                </Stack>

                                <p>by: {news.by}</p>
                                {news.time ? <p>date: {new Date(news.time * 1000).toUTCString()}</p> : ''}
                            </div> : ''
                        }

                    </CardContent>
                </NavLink>
            </Card>
        </Grid>

    );
};