import React, {useEffect} from 'react';
import {getSelectedNews} from "../../api/hackerNewsApi";
import {NavLink, useParams} from "react-router-dom";
import {ItemType} from "../../types/ItemType";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setNews} from "../../reducers/selectedNews";
import {Comments} from "./Comments/Comments";

type MapStatePropsType = {
    news: ItemType | null,
}

type MapDispatchPropsType = {
    setNews: (news: ItemType) => void,
}

type SelectedNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

export const SelectedNewsComponent: React.FC<SelectedNewsComponentPropsType> = (props) => {
    const params = useParams<{newsId: string}>();

    useEffect(() => {
        getSelectedNews(params.newsId).then(response => {
            props.setNews(response.data);
        });
    }, []);

    return (
        <div>
            <NavLink to={`/news`}>back to all news</NavLink>
            {props.news ?
                <div>
                    <h3>{props.news.title}</h3>
                    <p><a href={props.news.url}>go to news</a></p>
                    {props.news.time ? <p>date: {new Date(props.news.time * 1000).toUTCString()}</p> : ''}
                    <p>by: {props.news.by}</p>
                    <p>comments count: {props.news.descendants}</p>
                    {props.news.descendants && props.news.kids
                    ? props.news.kids.map(id => <Comments key={id} id={id}/>)
                    : ""}
                </div> : ''
            }
        </div>
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