import {ItemType} from "../types/ItemType";

type SelectedNewsPage = {
    news: ItemType | null;
}

const initialState: SelectedNewsPage = {
    news: null,
}

export const SelectedNewsReducer = (state: SelectedNewsPage = initialState, action: GenerationType) => {
    switch (action.type) {
        case 'SET-NEWS': {
            return {...state, news: action.payload.news};
        }
        default:
            return state;
    }
}

type GenerationType = SetNewsType;

type SetNewsType = ReturnType<typeof setNews>
export const setNews = (news: ItemType | null) => {
    return {
        type: 'SET-NEWS',
        payload: {
            news,
        },
    } as const
}