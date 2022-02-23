export type NewsType = {
    by?: string,
    descendants?: number,
    id: number,
    kids?: Array<number>,
    score?: number,
    time?: number,
    title?: string,
    type?: string,
    url?: string,
}

type NewsPageType = {
    allNewsId: Array<number>,
    isUpdateNews: boolean,
}

const initialState: NewsPageType = {
    allNewsId: [],
    isUpdateNews: false,
}

export const NewsReducer = (state: NewsPageType = initialState, action: GenerationType) => {
    switch (action.type) {
        case 'SET-ALL-NEWS-ID': {
            return {...state, allNewsId: [...action.payload.allNewsId]};
        }
        case 'UPDATE-NEWS': {
            return {...state, isUpdateNews: action.payload.isUpdate};
        }
        default:
            return state;
    }
}

type GenerationType = SetAllNewsIdType |  UpdateNewsType;

type SetAllNewsIdType = ReturnType<typeof setAllNewsId>;
export const setAllNewsId = (allNewsId: Array<number>) => {
    return {
        type: 'SET-ALL-NEWS-ID',
        payload: {
            allNewsId,
        }
    } as const
}

type UpdateNewsType = ReturnType<typeof updateNews>;
export const updateNews = (isUpdate: boolean) => {
    return {
        type: 'UPDATE-NEWS',
        payload: {
            isUpdate,
        }
    } as const
}