import React, {useEffect} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useParams} from "react-router-dom";
import {ItemType} from "../../types/ItemType";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setNews} from "../../reducers/selectedNews";
import {Comments} from "./Comments/Comments";
import {Button, Card, CardContent, CircularProgress, Grid, Link} from "@mui/material";
import style from './SelectedNews.module.css'

type MapStatePropsType = {
    news: ItemType | null,
}

type MapDispatchPropsType = {
    setNews: (news: ItemType | null) => void,
}

type SelectedNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

export const SelectedNewsComponent: React.FC<SelectedNewsComponentPropsType> = (props) => {
    const params = useParams<{ newsId: string }>();

    useEffect(() => {
        getSelectedNews(params.newsId).then(response => {
            props.setNews(response.data);

        });
        return () => {
            props.setNews(null);
        }
    }, []);

    useEffect(() => {
        if (props.news?.title) {
            document.title = props.news?.title;
            console.log(props.news.title)
        }
    })

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="outlined"><NavLink className={style.linkBack} to={`/news`}>back to all
                    news</NavLink></Button>
            </Grid>
            {props.news
                ? <Grid item xs={12}>
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
                : <div className={style.preloaderWrapper}><CircularProgress /></div>
            }
        </Grid>
    );
};

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
    return {
        news: state.SelectedNewsReducer.news,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setNews: (news) => dispatch(setNews(news)),
    }
}

export const SelectedNews = connect(mapStateToProps, mapDispatchToProps)(SelectedNewsComponent);
