import React, {memo, useEffect, useState} from 'react';
import {AppRootStateType} from "../../app/store/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllNews, setErrorAC} from "../../app/store/reducers/allNewsReducer";
import {Button, Grid} from "@mui/material";
import {News} from "./News/News";
import style from "./AllNews.module.css";
import {CircleLoader} from "../loader/CircleLoader/CircleLoader";
import {setAppLoadingAC} from "../../app/store/reducers/app-reducer";

export const AllNews = memo(function AllNews() {
    const dispatch = useDispatch();

    const allNewsId = useSelector<AppRootStateType, Array<number>>(state => state.AllNewsReducer.allNewsId);
    const isUpdateNews = useSelector<AppRootStateType, boolean>(state => state.AppReducer.isLoading);
    const error = useSelector<AppRootStateType, string | null>(state => state.AllNewsReducer.error);

    const updateNews = (isUpdate: boolean) => dispatch(setAppLoadingAC(isUpdate));
    const setError = (error: string | null) => dispatch(setErrorAC(error));

    const [isChange, setIsChange] = useState(false);

    const allNews = allNewsId.map(newsId => <News key={newsId} newsId={newsId}/>)

    useEffect(() => {
        document.title = 'Hacker News';
    }, []);

    useEffect(() => {
        dispatch(fetchAllNews());
        return () => {
            setError(null);
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
                <h1 className={style.title}>Hacker News</h1>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" disabled={isUpdateNews} onClick={() => {
                    setIsChange(!isChange)
                    updateNews(true);
                }}>update
                </Button>
            </Grid>
            {error && <Grid item xs={12}><span className={style.error}>Error: {error}</span></Grid>}
            {isUpdateNews && <CircleLoader/>}
            {allNews}
        </Grid>
    );
});
