import React, {memo, useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {ItemType} from "../../types/ItemType";
import {AppRootStateType} from "../../app/store/store";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchComments,
    fetchNews,
    setErrorAC,
    setNewsAC, updateLoadingCommentsAC,
} from "../../app/store/reducers/selectedNewsReducer";
import {Comments} from "./Comments/Comments";
import {Button, Card, CardContent, Grid, Link} from "@mui/material";
import style from './SelectedNews.module.css'
import {CircleLoader} from "../loader/CircleLoader/CircleLoader";
import {LineLoader} from "../loader/LineLoader/LineLoader";


export const SelectedNews = memo(function SelectedNewsComponent () {
    const params = useParams<{ newsId: string }>();
    const dispatch = useDispatch();

    const news = useSelector<AppRootStateType, ItemType | null>(state => state.SelectedNewsReducer.news);
    const error = useSelector<AppRootStateType, string | null>(state => state.SelectedNewsReducer.error);
    const isLoadingNews = useSelector<AppRootStateType, boolean>(state => state.AppReducer.isLoading);
    const isLoadingComments = useSelector<AppRootStateType, boolean>(state => state.SelectedNewsReducer.isLoadingComments);

    const setNews = (news: ItemType | null) => dispatch(setNewsAC(news));
    const setError = (error: string | null) => dispatch(setErrorAC(error));
    const updateLoadingComments = (isLoadingComments: boolean) => dispatch(updateLoadingCommentsAC(isLoadingComments));

    const [isChange, setIsChange] = useState(false);

    const newsComments = news?.kids && news.kids.map(id => <Comments key={id} id={id}/>)

    useEffect(() => {
        if (news?.title) {
            document.title = news?.title;
        }
    }, [news?.title]);


    useEffect(() => {
        dispatch(fetchNews(params.newsId));
        return () => {
            setError(null);
            setNews(null);
        }
    }, []);

    useEffect(() => {
        dispatch(fetchComments(params.newsId));
    }, [isChange]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setIsChange(!isChange)
        }, 60000);
        return () => clearTimeout(timeout);
    }, [isChange]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {news && <h2 className={style.mainTitle} dangerouslySetInnerHTML={{__html: news.title}}/>}
                <NavLink className={style.linkBack} to={`/news`}>
                    <Button variant="outlined" >
                        back to all news
                    </Button>
                </NavLink>
            </Grid>
            {error && <Grid item xs={12}><span className={style.error}>Error: {error}</span></Grid>}
            {isLoadingNews && <CircleLoader/>}
            {news
                && <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <h3 className={style.title} dangerouslySetInnerHTML={{__html: news.title}}/>
                            <p className={style.text}><Link style={{cursor: 'pointer'}} underline="hover" target={'_blank'} href={news.url}>go to news</Link></p>
                            <p className={style.text}>By: {news.by}</p>
                            <p className={style.text}>Publication date: {new Date(news.time * 1000).toLocaleDateString()} {new Date(news.time * 1000).toLocaleTimeString()}</p>
                            <p className={style.text}>comments count: {news.descendants}</p>
                            <Button disabled={isLoadingComments} onClick={() => {
                                updateLoadingComments(true);
                                setIsChange(!isChange);
                            }}>Update comments</Button>
                            <LineLoader isLoading={isLoadingComments}/>
                            {newsComments}
                        </CardContent>
                    </Card>
                </Grid>
            }
        </Grid>
    );
});