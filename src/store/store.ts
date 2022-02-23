import {combineReducers, createStore} from "redux";
import {NewsReducer} from "../reducers/newsReducer";


const rootReducer = combineReducers({
    NewsReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>;

export const Store = createStore(rootReducer);