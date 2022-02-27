type AllNewsPageType = {
    allNewsId: Array<number>,
    isUpdateNews: boolean,
    error: string,
}

const initialState: AllNewsPageType = {
    allNewsId: [],
    isUpdateNews: false,
    error: '',
}

export const AllNewsReducer = (state: AllNewsPageType = initialState, action: GenerationType) => {
    switch (action.type) {
        case 'SET-ALL-NEWS-ID': {
            return {...state, allNewsId: [...action.payload.allNewsId]};
        }
        case 'UPDATE-NEWS': {
            return {...state, isUpdateNews: action.payload.isUpdate};
        }
        case 'SET-ERROR': {
            return {...state, error: action.payload.error};
        }
        default:
            return state;
    }
}

type GenerationType = SetAllNewsIdType |  UpdateNewsType | SetErrorType;

type SetAllNewsIdType = ReturnType<typeof setAllNewsIdAC>;
export const setAllNewsIdAC = (allNewsId: Array<number>) => {
    return {
        type: 'SET-ALL-NEWS-ID',
        payload: {
            allNewsId,
        }
    } as const
}

type UpdateNewsType = ReturnType<typeof updateNewsAC>;
export const updateNewsAC = (isUpdate: boolean) => {
    return {
        type: 'UPDATE-NEWS',
        payload: {
            isUpdate,
        }
    } as const
}

type SetErrorType = ReturnType<typeof setErrorAC>;
export const setErrorAC = (error: string) => {
    return {
        type: 'SET-ERROR',
        payload: {
            error,
        }
    } as const
}