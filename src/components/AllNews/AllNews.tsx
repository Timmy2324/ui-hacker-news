import React, {memo, useEffect, useState} from 'react';
import {getAllNews} from "../../api/hackerNewsApi";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setAllNewsId, setError, updateNews} from "../../reducers/allNewsReducer";
import {Button, CircularProgress, Grid} from "@mui/material";
import {News} from "./News/News";
import style from "./AllNews.module.css";

type MapStatePropsType = {
    allNewsId: Array<number>,
    isUpdateNews: boolean,
    error: string,
}

type MapDispatchPropsType = {
    setAllNewsId: (allNewsId: Array<number>) => void,
    updateNews: (isUpdate: boolean) => void,
    setError: (error: string) => void,
}

type AllNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

const AllNewsComponent: React.FC<AllNewsComponentPropsType> = memo(function AllNewsComponent(props: AllNewsComponentPropsType) {
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        document.title = 'Hacker AllNews';
    });

    useEffect(() => {
        props.updateNews(true);
        getAllNews()
            .then(response => {
                props.setError('');
                props.setAllNewsId(response.data.slice(0, 100));
                props.updateNews(false);
            }).catch(error => {
                props.setError(error.response.data.error);
                props.updateNews(false);
            });
        return () => props.setError('');
    }, [isChange]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setIsChange(!isChange)
        }, 60000);
        return () => clearTimeout(timeout);
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

                {props.error && <Grid item xs={12}><span className={style.error}>Error: {props.error}</span></Grid>}
                {props.isUpdateNews && <div className={style.preloaderWrapper}><CircularProgress /></div>}
                {props.allNewsId.map(newsId => <News key={newsId} newsId={newsId}/>)}
            </Grid>

        </>

    );
});

const mapStateToProps = (state: AppStoreType): MapStatePropsType => {
    return {
        allNewsId: state.AllNewsReducer.allNewsId,
        isUpdateNews: state.AllNewsReducer.isUpdateNews,
        error: state.AllNewsReducer.error,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setAllNewsId: (allNewsId) => dispatch(setAllNewsId(allNewsId)),
        updateNews: (isUpdate) => dispatch(updateNews(isUpdate)),
        setError: (error) => dispatch(setError(error)),
    }
}

export const AllNews = connect(mapStateToProps, mapDispatchToProps)(AllNewsComponent);
