
enum AppActionType {
    SET_ERROR = 'APP/SET_ERROR',
    SET_IS_LOADING = 'APP/SET_IS_LOADING',
}

type InitialAppStateType = {
    error: null | string,
    isLoading: boolean,
}

const initialState: InitialAppStateType = {
    error: null,
    isLoading: false,
}

type ActionType = SetAppErrorType | SetAppLoadingType;

export const AppReducer = (state: InitialAppStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case AppActionType.SET_ERROR:
        case AppActionType.SET_IS_LOADING:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

//actions
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: AppActionType.SET_ERROR,
        payload: {
            error,
        },
    } as const
}

export type SetAppLoadingType = ReturnType<typeof setAppLoadingAC>
export const setAppLoadingAC = (isLoading: boolean) => {
    return {
        type: AppActionType.SET_IS_LOADING,
        payload: {
            isLoading,
        },
    } as const
}