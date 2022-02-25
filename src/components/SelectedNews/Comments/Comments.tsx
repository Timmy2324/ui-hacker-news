import { Grid } from '@mui/material';
import React, {memo, useEffect, useState} from 'react';
import {getComment} from "../../../api/hackerNewsApi";
import {ItemType} from "../../../types/ItemType";
import style from './Comments.module.css';

type CommentsPropsType = {
    id: number
    marginCount?: number
}

export const Comments: React.FC<CommentsPropsType> = memo(function(props: CommentsPropsType) {

    const [comment, setComment] = useState<ItemType | undefined>();
    const [error, setError] = useState('');

    useEffect(() => {

        getComment(String(props.id))
            .then(response => {
                setError('');
                setComment(response.data);
            }).catch(error => {
                setError(error.response.data.error);
        });
        return () => {
            setComment(undefined)
        }
    }, []);

    return (
        <Grid style={{marginLeft: (props.marginCount || 0) + 'px'}} item xs={12}>
            {error && <span className={style.error}>Error: {error}</span>}
            <h4 className={style.title}>{comment?.by}</h4>
            {comment?.text && <p dangerouslySetInnerHTML={{__html: comment.text}} className={style.text} />}
            {comment?.kids?.map(id => <Comments key={id} id={id} marginCount={props.marginCount ? props.marginCount + 20 : 20}/>)}
        </Grid>
    );
});