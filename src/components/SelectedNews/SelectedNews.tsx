import React, {memo, useEffect, useState} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useParams} from "react-router-dom";
import {ItemType} from "../../types/ItemType";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
    setCommentsCount,
    setCommentsId,
    setError,
    setNews,
    updateLoadingComments,
    updateLoadingNews
} from "../../reducers/selectedNews";
import {Comments} from "./Comments/Comments";
import {Button, Card, CardContent, CircularProgress, Grid, LinearProgress, Link} from "@mui/material";
import style from './SelectedNews.module.css'

type MapStatePropsType = {
    news: ItemType | null,
    error: string,
    isLoadingNews: boolean,
    isLoadingComments: boolean,
}

type MapDispatchPropsType = {
    setNews: (news: ItemType | null) => void,
    setError: (error: string) => void,
    setCommentsId: (commentsId: Array<number>) => void,
    setCommentsCount: (count: number) => void,
    updateLoadingNews: (isLoadingNews: boolean) => void,
    updateLoadingComments: (isLoadingComments: boolean) => void,
}

type SelectedNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

export const SelectedNewsComponent: React.FC<SelectedNewsComponentPropsType> = memo(function SelectedNewsComponent (props) {

    const [isChange, setIsChange] = useState(false);

    const params = useParams<{ newsId: string }>();

    useEffect(() => {
        props.updateLoadingNews(true);
        getSelectedNews(params.newsId)
            .then(response => {
                props.setError('');
                props.setNews(response.data);
                props.updateLoadingNews(false);
            }).catch(error => {
                props.setError(error.response.data.error);
                props.updateLoadingNews(false);
        });
        return () => {
            props.setError('');
            props.setNews(null);
        }
    }, []);

    useEffect(() => {
        if (props.news?.title) {
            document.title = props.news?.title;
        }
    }, [props.news?.title]);

    useEffect(() => {
        props.updateLoadingComments(true);
        getSelectedNews(params.newsId)
            .then(response => {
                props.setError('');
                props.setCommentsId(response.data.news?.kids);
                props.setCommentsCount(response.data.news?.descendants)
                props.updateLoadingComments(false);
            }).catch(error => {
                props.setError(error.response?.data.error);
                props.updateLoadingComments(false);
        });
        return () => {
            props.setError('');
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
            {props.error && <Grid item xs={12}><span className={style.error}>Error: {props.error}</span></Grid>}
            {props.isLoadingNews && <div className={style.preloaderWrapper}><CircularProgress /></div>}
            {props.news
                && <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <h3 className={style.title} dangerouslySetInnerHTML={{__html: props.news.title}}/>
                            <p className={style.text}><Link style={{cursor: 'pointer'}} underline="hover" target={'_blank'} href={props.news.url}>go to news</Link></p>
                            <p className={style.text}>By: {props.news.by}</p>
                            <p className={style.text}>Publication date: {new Date(props.news.time * 1000).toLocaleDateString()} {new Date(props.news.time * 1000).toLocaleTimeString()}</p>
                            <p className={style.text}>comments count: {props.news.descendants}</p>
                            <Button disabled={props.isLoadingComments} onClick={() => {
                                props.updateLoadingComments(true);
                                setIsChange(!isChange);
                            }}>Update comments</Button>
                            <div style={{height: '4px'}}>
                                {props.isLoadingComments && <LinearProgress />}
                            </div>
                            {props.news.kids && props.news.kids.map(id => <Comments key={id} id={id}/>)}
                        </CardContent>
                    </Card>
                </Grid>
            }
        </Grid>
    );
});

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
    return {
        news: state.SelectedNewsReducer.news,
        error: state.SelectedNewsReducer.error,
        isLoadingNews: state.SelectedNewsReducer.isLoadingNews,
        isLoadingComments: state.SelectedNewsReducer.isLoadingComments,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setNews: (news) => dispatch(setNews(news)),
        setError: (error) => dispatch(setError(error)),
        setCommentsId: (commentsId) => dispatch(setCommentsId(commentsId)),
        setCommentsCount: (count) => dispatch(setCommentsCount(count)),
        updateLoadingNews: (isLoadingNews) => dispatch(updateLoadingNews(isLoadingNews)),
        updateLoadingComments: (isLoadingComments) => dispatch(updateLoadingComments(isLoadingComments)),
    }
}

export const SelectedNews = connect(mapStateToProps, mapDispatchToProps)(SelectedNewsComponent);
