import React from 'react';
import style from './LineLoader.module.css';
import {LinearProgress} from "@mui/material";

type LineLoaderPropsType = {
    isLoading: boolean
}

export const LineLoader = ({isLoading}: LineLoaderPropsType) => {
    return (
        <div className={style.wrapperLoader}>
            {isLoading && <LinearProgress />}
        </div>
    );
};