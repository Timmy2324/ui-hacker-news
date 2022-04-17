import {Button, Grid} from '@mui/material';
import React, {memo, useEffect, useState} from 'react';
import {newsAPI} from "../../../api/hackerNewsApi";
import {ItemType} from "../../../types/ItemType";
import style from './Comments.module.css';
import {ExpandLess, ExpandMore} from "@mui/icons-material";

type CommentsPropsType = {
    id: number
    marginCount?: number
    isChild?: boolean
}

export const Comments: React.FC<CommentsPropsType> = memo(function(props: CommentsPropsType) {

    const [comment, setComment] = useState<ItemType | undefined>();
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        newsAPI.getComment(String(props.id))
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
            <h4 className={style.title}>{(comment?.dead || comment?.deleted) ? <span className={style.error}>Nickname missing</span> : comment?.by}</h4>
            {(comment?.dead || comment?.deleted) && <p>Comment deleted</p>}
            {comment?.text && <p dangerouslySetInnerHTML={{__html: comment.text}} className={style.text} />}
            {comment?.kids && !props.isChild && <Button onClick={handleClick}>read more comments{isOpen ? <ExpandLess /> : <ExpandMore />}</Button>}
            {isOpen && comment?.kids?.map(id => <Comments isChild={true} key={id} id={id} marginCount={props.marginCount ? props.marginCount + 20 : 20}/>)}
        </Grid>
    );
});