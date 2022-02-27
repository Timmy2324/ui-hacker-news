import React, {memo, useEffect, useState} from 'react';
import {getAllNews} from "../../api/hackerNewsApi";
import {AppStoreType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {setAllNewsIdAC, setErrorAC, updateNewsAC} from "../../reducers/allNewsReducer";
import {Button, CircularProgress, Grid} from "@mui/material";
import {News} from "./News/News";
import style from "./AllNews.module.css";

export const AllNews = memo(function AllNews() {
    const dispatch = useDispatch();

    const allNewsId = useSelector<AppStoreType, Array<number>>(state => state.AllNewsReducer.allNewsId);
    const isUpdateNews = useSelector<AppStoreType, boolean>(state => state.AllNewsReducer.isUpdateNews);
    const error = useSelector<AppStoreType, string>(state => state.AllNewsReducer.error);

    const setAllNewsId = (allNewsId: Array<number>) => dispatch(setAllNewsIdAC(allNewsId));
    const updateNews = (isUpdate: boolean) => dispatch(updateNewsAC(isUpdate));
    const setError = (error: string) => dispatch(setErrorAC(error));

    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        document.title = 'Hacker AllNews';
    });

    useEffect(() => {
        updateNews(true);
        getAllNews()
            .then(response => {
                setError('');
                setAllNewsId(response.data.slice(0, 100));
                updateNews(false);
            }).catch(error => {
                setError(error.response.data.error);
                updateNews(false);
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
        <>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className={style.title}>Hacker News</h1>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" disabled={isUpdateNews} onClick={() => {
                        updateNews(true);
                        setIsChange(!isChange)
                    }}>update
                    </Button>
                </Grid>

                {error && <Grid item xs={12}><span className={style.error}>Error: {error}</span></Grid>}
                {isUpdateNews && <div className={style.preloaderWrapper}><CircularProgress /></div>}
                {allNewsId.map(newsId => <News key={newsId} newsId={newsId}/>)}
            </Grid>

        </>

    );
});
