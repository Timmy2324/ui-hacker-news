import {combineReducers, createStore} from "redux";
import {AllNewsReducer} from "../reducers/allNewsReducer";
import {SelectedNewsReducer} from "../reducers/selectedNews";


const rootReducer = combineReducers({
    NewsReducer: AllNewsReducer,
    SelectedNewsReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>;

export const Store = createStore(rootReducer);