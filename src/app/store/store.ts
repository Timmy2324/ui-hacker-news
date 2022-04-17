import {applyMiddleware, combineReducers, createStore} from "redux";
import {AllNewsReducer} from "./reducers/allNewsReducer";
import {SelectedNewsReducer} from "./reducers/selectedNewsReducer";
import {AppReducer} from "./reducers/app-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    AllNewsReducer,
    SelectedNewsReducer,
    AppReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));