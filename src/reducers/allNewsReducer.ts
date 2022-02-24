type AllNewsPageType = {
    allNewsId: Array<number>,
    isUpdateNews: boolean,
}

const initialState: AllNewsPageType = {
    allNewsId: [],
    isUpdateNews: false,
}

export const AllNewsReducer = (state: AllNewsPageType = initialState, action: GenerationType) => {
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