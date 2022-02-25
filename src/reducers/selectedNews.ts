import {ItemType} from "../types/ItemType";

type SelectedNewsPage = {
    news: ItemType | null,
    error: string,
    isLoading: boolean,
}

const initialState: SelectedNewsPage = {
    news: null,
    error: '',
    isLoading: false,
}

export const SelectedNewsReducer = (state: SelectedNewsPage = initialState, action: GenerationType) => {
    switch (action.type) {
        case 'SET-NEWS': {
            return {...state, news: action.payload.news};
        }
        case 'SET-ERROR': {
            return {...state, error: action.payload.error};
        }
        case 'UPDATE-LOADING': {
            return {...state, isLoading: action.payload.isLoading};
        }
        default:
            return state;
    }
}

type GenerationType = SetNewsType | SetErrorType | UpdateLoadingType;

type SetNewsType = ReturnType<typeof setNews>
export const setNews = (news: ItemType | null) => {
    return {
        type: 'SET-NEWS',
        payload: {
            news,
        },
    } as const
}

type SetErrorType = ReturnType<typeof setError>
export const setError = (error: string) => {
    return {
        type: 'SET-ERROR',
        payload: {
            error,
        },
    } as const
}

type UpdateLoadingType = ReturnType<typeof updateLoading>
export const updateLoading = (isLoading: boolean) => {
    return {
        type: 'UPDATE-LOADING',
        payload: {
            isLoading,
        },
    } as const
}