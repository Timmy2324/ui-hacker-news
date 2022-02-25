import React, {useEffect} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useParams} from "react-router-dom";
import {ItemType} from "../../types/ItemType";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setError, setNews, updateLoading} from "../../reducers/selectedNews";
import {Comments} from "./Comments/Comments";
import {Button, Card, CardContent, CircularProgress, Grid, Link} from "@mui/material";
import style from './SelectedNews.module.css'

type MapStatePropsType = {
    news: ItemType | null,
    error: string,
    isLoading: boolean,
}

type MapDispatchPropsType = {
    setNews: (news: ItemType | null) => void,
    setError: (error: string) => void,
    updateLoading: (isLoading: boolean) => void,
}

type SelectedNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

export const SelectedNewsComponent: React.FC<SelectedNewsComponentPropsType> = (props) => {
    const params = useParams<{ newsId: string }>();

    useEffect(() => {
        props.updateLoading(true);
        getSelectedNews(params.newsId)
            .then(response => {
                props.setError('');
                props.setNews(response.data);
                props.updateLoading(false);
            }).catch(error => {
                props.setError(error.response.data.error);
                props.updateLoading(false);
        });
        return () => {
            props.setNews(null);
            props.setError('');
        }
    }, []);

    useEffect(() => {
        if (props.news?.title) {
            document.title = props.news?.title;
        }
    }, [props.news?.title])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="outlined"><NavLink className={style.linkBack} to={`/news`}>back to all
                    news</NavLink></Button>
            </Grid>
            {props.error && <Grid item xs={12}><span className={style.error}>Error: {props.error}</span></Grid>}
            {props.isLoading && <div className={style.preloaderWrapper}><CircularProgress /></div>}
            {props.news
                && <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <h3 className={style.title}>{props.news.title}</h3>
                            {props.news.url && <p className={style.text}><Link underline="hover" href={props.news.url}>go to news</Link></p>}
                            <p className={style.text}>By: {props.news.by}</p>
                            {props.news.time && <p className={style.text}>Publication date: {new Date(props.news.time * 1000).toLocaleDateString()} {new Date(props.news.time * 1000).toLocaleTimeString()}</p>}
                            <p className={style.text}>comments count: {props.news.descendants}</p>
                            {props.news.kids && props.news.kids.map(id => <Comments key={id} id={id}/>)}
                        </CardContent>
                    </Card>
                </Grid>
            }
        </Grid>
    );
};

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
    return {
        news: state.SelectedNewsReducer.news,
        error: state.SelectedNewsReducer.error,
        isLoading: state.SelectedNewsReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setNews: (news) => dispatch(setNews(news)),
        setError: (error) => dispatch(setError(error)),
        updateLoading: (isLoading) => dispatch(updateLoading(isLoading)),
    }
}

export const SelectedNews = connect(mapStateToProps, mapDispatchToProps)(SelectedNewsComponent);
