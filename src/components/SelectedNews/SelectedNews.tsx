import React, {memo, useEffect, useState} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useParams} from "react-router-dom";
import {ItemType} from "../../types/ItemType";
import {AppStoreType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {
    setCommentsCountAC,
    setCommentsIdAC,
    setErrorAC,
    setNewsAC, updateLoadingCommentsAC, updateLoadingNewsAC,
} from "../../reducers/selectedNews";
import {Comments} from "./Comments/Comments";
import {Button, Card, CardContent, CircularProgress, Grid, LinearProgress, Link} from "@mui/material";
import style from './SelectedNews.module.css'


export const SelectedNews = memo(function SelectedNewsComponent () {
    const dispatch = useDispatch();

    const news = useSelector<AppStoreType, ItemType | null>(state => state.SelectedNewsReducer.news);
    const error = useSelector<AppStoreType, string>(state => state.SelectedNewsReducer.error);
    const isLoadingNews = useSelector<AppStoreType, boolean>(state => state.SelectedNewsReducer.isLoadingNews);
    const isLoadingComments = useSelector<AppStoreType, boolean>(state => state.SelectedNewsReducer.isLoadingComments);

    const setNews = (news: ItemType | null) => dispatch(setNewsAC(news));
    const setError = (error: string) => dispatch(setErrorAC(error));
    const setCommentsId = (commentsId: Array<number>) => dispatch(setCommentsIdAC(commentsId));
    const setCommentsCount = (count: number) => dispatch(setCommentsCountAC(count));
    const updateLoadingNews = (isLoadingNews: boolean) => dispatch(updateLoadingNewsAC(isLoadingNews));
    const updateLoadingComments = (isLoadingComments: boolean) => dispatch(updateLoadingCommentsAC(isLoadingComments));

    const [isChange, setIsChange] = useState(false);

    const params = useParams<{ newsId: string }>();

    useEffect(() => {
        updateLoadingNews(true);
        getSelectedNews(params.newsId)
            .then(response => {
                setError('');
                setNews(response.data);
                updateLoadingNews(false);
            }).catch(error => {
                setError(error.response.data.error);
                updateLoadingNews(false);
        });
        return () => {
            setError('');
            setNews(null);
        }
    }, []);

    useEffect(() => {
        if (news?.title) {
            document.title = news?.title;
        }
    }, [news?.title]);

    useEffect(() => {
        updateLoadingComments(true);
        getSelectedNews(params.newsId)
            .then(response => {
                setError('');
                setCommentsId(response.data.news?.kids);
                setCommentsCount(response.data.news?.descendants)
                updateLoadingComments(false);
            }).catch(error => {
                setError(error.response?.data.error);
                updateLoadingComments(false);
        });
        return () => {
            setError('');
        }
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
                <NavLink className={style.linkBack} to={`/news`}>
                    <Button variant="outlined" >
                        back to all news
                    </Button>
                </NavLink>
            </Grid>
            {error && <Grid item xs={12}><span className={style.error}>Error: {error}</span></Grid>}
            {isLoadingNews && <div className={style.preloaderWrapper}><CircularProgress /></div>}
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
                            <div style={{height: '4px'}}>
                                {isLoadingComments && <LinearProgress />}
                            </div>
                            {news.kids && news.kids.map(id => <Comments key={id} id={id}/>)}
                        </CardContent>
                    </Card>
                </Grid>
            }
        </Grid>
    );
});