import React from 'react';
import {CircularProgress} from "@mui/material";
import style from './CircleLoader.module.css';

export const CircleLoader = () => {
    return (
        <div className={style.wrapperLoader}>
            <CircularProgress />
        </div>
    );
};