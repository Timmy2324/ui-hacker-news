import React, {memo, useEffect, useState} from 'react';
import {getAllNews} from "../../api/hackerNewsApi";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setAllNewsId, updateNews} from "../../reducers/allNewsReducer";
import {Button, CircularProgress, Grid} from "@mui/material";
import {News} from "./News/News";
import style from "./AllNews.module.css";

type MapStatePropsType = {
    allNewsId: Array<number>,
    isUpdateNews: boolean,
}

type MapDispatchPropsType = {
    setAllNewsId: (allNewsId: Array<number>) => void,
    updateNews: (isUpdate: boolean) => void,
}

type AllNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

const AllNewsComponent: React.FC<AllNewsComponentPropsType> = memo(function AllNewsComponent(props: AllNewsComponentPropsType) {
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        document.title = 'Hacker AllNews';
    });

    useEffect(() => {
        props.updateNews(true);
        getAllNews().then(response => {
            props.setAllNewsId(response.data.slice(0, 100));
            props.updateNews(false);
        });
        return () => props.setAllNewsId([]);
    }, [isChange]);

    useEffect(() => {
        setTimeout(() => {
            setIsChange(!isChange)
        }, 60000);
    }, [isChange]);


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className={style.title}>Hacker News</h1>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" disabled={props.isUpdateNews} onClick={() => {
                        props.updateNews(true);
                        setIsChange(!isChange)
                    }}>update
                    </Button>
                </Grid>
                {props.allNewsId.length === 0 && <div className={style.preloaderWrapper}><CircularProgress /></div>}
                {props.allNewsId.map(newsId => <News key={newsId} newsId={newsId}/>)}
            </Grid>

        </>

    );
});

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
    return {
        allNewsId: state.NewsReducer.allNewsId,
        isUpdateNews: state.NewsReducer.isUpdateNews,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setAllNewsId: (allNewsId) => dispatch(setAllNewsId(allNewsId)),
        updateNews: (isUpdate) => dispatch(updateNews(isUpdate)),
    }
}

export const AllNews = connect(mapStateToProps, mapDispatchToProps)(AllNewsComponent);
