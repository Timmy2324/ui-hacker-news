import {ItemType} from "../../../types/ItemType";
import {newsAPI} from "../../../api/hackerNewsApi";
import {Dispatch} from "redux";
import {setAppLoadingAC, SetAppLoadingType} from "./app-reducer";

enum SelectedNewsActionType {
    SET_NEWS = 'SelectedNews/SET_NEWS',
    SET_ERROR = 'SelectedNews/SET_ERROR',
    SET_COMMENTS = 'SelectedNews/SET_COMMENTS',
    SET_COMMENTS_COUNT = 'SelectedNews/SET_COMMENTS_COUNT',
    UPDATE_LOADING_COMMENTS = 'SelectedNews/UPDATE_LOADING_COMMENTS',
}

type SelectedNewsPage = {
    news: ItemType | null,
    error: string | null,
    isLoadingComments: boolean,
}

type ThunkDispatchType = Dispatch<ActionType | SetAppLoadingType>;

type ActionType = SetNewsType
                | SetErrorType
                | SetCommentsType
                | SetCommentsCountType
                | UpdateLoadingCommentsType;

const initialState: SelectedNewsPage = {
    news: null,
    error: null,
    isLoadingComments: false,
}

export const SelectedNewsReducer = (state: SelectedNewsPage = initialState, action: ActionType) => {
    switch (action.type) {
        case SelectedNewsActionType.SET_NEWS: {
            return {...state, news: action.payload.news};
        }
        case SelectedNewsActionType.SET_ERROR: {
            return {...state, error: action.payload.error};
        }
        case SelectedNewsActionType.SET_COMMENTS: {
            if(state.news) {
                return {...state, news: {...state.news, kids: [...action.payload.commentsId]}}
            }
            return {...state};
        }
        case SelectedNewsActionType.SET_COMMENTS_COUNT: {
            if(state.news) {
                return {...state, news: {...state.news, descendants: action.payload.count}}
            }
            return {...state};
        }
        case SelectedNewsActionType.UPDATE_LOADING_COMMENTS: {
            return {...state, isLoadingComments: action.payload.isLoadingComments};
        }
        default:
            return state;
    }
}

//actions
type SetNewsType = ReturnType<typeof setNewsAC>
export const setNewsAC = (news: ItemType | null) => {
    return {
        type: SelectedNewsActionType.SET_NEWS,
        payload: {
            news,
        },
    } as const
}

type SetErrorType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string | null) => {
    return {
        type: SelectedNewsActionType.SET_ERROR,
        payload: {
            error,
        },
    } as const
}

type SetCommentsType = ReturnType<typeof setCommentsIdAC>
export const setCommentsIdAC = (commentsId: Array<number>) => {
    return {
        type: SelectedNewsActionType.SET_COMMENTS,
        payload: {
            commentsId,
        },
    } as const
}

type SetCommentsCountType = ReturnType<typeof setCommentsCountAC>
export const setCommentsCountAC = (count: number) => {
    return {
        type: SelectedNewsActionType.SET_COMMENTS_COUNT,
        payload: {
            count,
        },
    } as const
}

type UpdateLoadingCommentsType = ReturnType<typeof updateLoadingCommentsAC>
export const updateLoadingCommentsAC = (isLoadingComments: boolean) => {
    return {
        type: SelectedNewsActionType.UPDATE_LOADING_COMMENTS,
        payload: {
            isLoadingComments,
        },
    } as const
}

// thunk
export const fetchNews = (newsId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppLoadingAC(true));
    newsAPI.getSelectedNews(newsId)
        .then(({data}) => {
            dispatch(setErrorAC(''));
            dispatch(setNewsAC(data));
            dispatch(setAppLoadingAC(false));
        }).catch(error => {
            dispatch(setErrorAC(error.message));
            dispatch(setAppLoadingAC(false));
        });
}

export const fetchComments = (newsId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(updateLoadingCommentsAC(true));
    newsAPI.getComment(newsId)
        .then(({data}) => {
            dispatch(setErrorAC(''));
            if (data.kids) {
                dispatch(setCommentsIdAC(data.kids));
            }
            dispatch(setCommentsCountAC(data.descendants));
            dispatch(updateLoadingCommentsAC(false));
        }).catch(error => {
            dispatch(setErrorAC(error.message));
            dispatch(updateLoadingCommentsAC(false));
        });
}