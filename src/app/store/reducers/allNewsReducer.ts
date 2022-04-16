import {Dispatch} from "redux";
import {setAppLoadingAC, SetAppLoadingType} from "./app-reducer";
import {newsAPI} from "../../../api/hackerNewsApi";

enum AllNewsActionType {
    SET_ALL_NEWS_ID = 'AllNews/SET_ALL_NEWS_ID',
    SET_ERROR = 'AllNews/SET_ERROR',
}

type AllNewsPageType = {
    allNewsId: Array<number>,
    error: string | null,
}

type ActionType = SetAllNewsIdType | SetErrorType;

type ThunkDispatchType = Dispatch<ActionType | SetAppLoadingType>;

const initialState: AllNewsPageType = {
    allNewsId: [],
    error: null,
}

export const AllNewsReducer = (state: AllNewsPageType = initialState, action: ActionType) => {
    switch (action.type) {
        case AllNewsActionType.SET_ALL_NEWS_ID:
        case AllNewsActionType.SET_ERROR: {
            return {...state, ...action.payload};
        }
        default:
            return state;
    }
}

//actions
type SetAllNewsIdType = ReturnType<typeof setAllNewsIdAC>;
export const setAllNewsIdAC = (allNewsId: Array<number>) => {
    return {
        type: AllNewsActionType.SET_ALL_NEWS_ID,
        payload: {
            allNewsId,
        }
    } as const
}

type SetErrorType = ReturnType<typeof setErrorAC>;
export const setErrorAC = (error: string | null) => {
    return {
        type: AllNewsActionType.SET_ERROR,
        payload: {
            error,
        }
    } as const
}

//thunk
export const fetchAllNews = () => (dispatch: ThunkDispatchType) => {
    dispatch(setAppLoadingAC(true));
    newsAPI.getAllNews()
        .then(({data}) => {
            dispatch(setErrorAC(null));
            dispatch(setAllNewsIdAC(data.slice(0, 100)));
            dispatch(setAppLoadingAC(false));
        }).catch(error => {
        dispatch(setErrorAC(error.message));
        dispatch(setAppLoadingAC(false));
    });
}

// export const fetchNews = (newsId: string) => (dispatch: ThunkDispatchType) => {
//     newsAPI.getSelectedNews(newsId)
//         .then(({data}) => {
//             dispatch(setErrorAC(null));
//             dispatch(setAllNewsIdAC(data));
//         }).catch(error => {
//         dispatch(setErrorAC(error.message));
//     });
// }