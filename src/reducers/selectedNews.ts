import {ItemType} from "../types/ItemType";

type SelectedNewsPage = {
    news: ItemType | null,
    error: string,
    isLoadingNews: boolean,
    isLoadingComments: boolean,
}

const initialState: SelectedNewsPage = {
    news: null,
    error: '',
    isLoadingNews: false,
    isLoadingComments: false,
}

export const SelectedNewsReducer = (state: SelectedNewsPage = initialState, action: GenerationType) => {
    switch (action.type) {
        case 'SET-NEWS': {
            return {...state, news: action.payload.news};
        }
        case 'SET-ERROR': {
            return {...state, error: action.payload.error};
        }
        case 'SET-COMMENTS': {
            if(state.news) {
                return {...state, news: {...state.news, kids: [...action.payload.commentsId]}}
            }
            return {...state};
        }
        case 'SET-COMMENTS-COUNT': {
            if(state.news) {
                return {...state, news: {...state.news, descendants: action.payload.count}}
            }
            return {...state};
        }
        case 'UPDATE-LOADING-NEWS': {
            return {...state, isLoadingNews: action.payload.isLoadingNews};
        }
        case 'UPDATE-LOADING-COMMENTS': {
            return {...state, isLoadingComments: action.payload.isLoadingComments};
        }
        default:
            return state;
    }
}

type GenerationType = SetNewsType | SetErrorType | SetCommentsType | SetCommentsCountType | UpdateLoadingNewsType | UpdateLoadingCommentsType;

type SetNewsType = ReturnType<typeof setNewsAC>
export const setNewsAC = (news: ItemType | null) => {
    return {
        type: 'SET-NEWS',
        payload: {
            news,
        },
    } as const
}

type SetErrorType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string) => {
    return {
        type: 'SET-ERROR',
        payload: {
            error,
        },
    } as const
}

type SetCommentsType = ReturnType<typeof setCommentsIdAC>
export const setCommentsIdAC = (commentsId: Array<number>) => {
    return {
        type: 'SET-COMMENTS',
        payload: {
            commentsId,
        },
    } as const
}

type SetCommentsCountType = ReturnType<typeof setCommentsCountAC>
export const setCommentsCountAC = (count: number) => {
    return {
        type: 'SET-COMMENTS-COUNT',
        payload: {
            count,
        },
    } as const
}


type UpdateLoadingNewsType = ReturnType<typeof updateLoadingNewsAC>
export const updateLoadingNewsAC = (isLoadingNews: boolean) => {
    return {
        type: 'UPDATE-LOADING-NEWS',
        payload: {
            isLoadingNews,
        },
    } as const
}

type UpdateLoadingCommentsType = ReturnType<typeof updateLoadingCommentsAC>
export const updateLoadingCommentsAC = (isLoadingComments: boolean) => {
    return {
        type: 'UPDATE-LOADING-COMMENTS',
        payload: {
            isLoadingComments,
        },
    } as const
}