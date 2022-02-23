import {combineReducers, createStore} from "redux";
import {NewsReducer} from "../reducers/newsReducer";
import {SelectedNewsReducer} from "../reducers/selectedNews";


const rootReducer = combineReducers({
    NewsReducer,
    SelectedNewsReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>;

export const Store = createStore(rootReducer);