import React, {useEffect, useState} from 'react';
import {getAllNews} from "../../api/hackerNewsApi";
import {AppStoreType} from "../../store/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {setAllNewsId, updateNews} from "../../reducers/newsReducer";
import {News} from "./News";

type MapStatePropsType = {
    allNewsId: Array<number>,
    isUpdateNews: boolean,
}

type MapDispatchPropsType = {
    setAllNewsId: (allNewsId: Array<number>) => void,
    updateNews: (isUpdate: boolean) => void,
}

type AllNewsComponentPropsType = MapStatePropsType & MapDispatchPropsType;

const AllNewsComponent: React.FC<AllNewsComponentPropsType> = (props) => {

    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        props.updateNews(true);
        getAllNews().then(response => {
            props.setAllNewsId([]);
            props.setAllNewsId(response.data.splice(0, 100));
            props.updateNews(false);
        });

    }, [isChange]);

    return (
        <>
            <button disabled={props.isUpdateNews} onClick={() => {
                props.updateNews(true);
                setIsChange(!isChange)
            }}>update
            </button>
            {props.allNewsId.map(newsId => <News key={newsId} id={newsId}/>)}
        </>

    );
};

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