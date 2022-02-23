import React, {useEffect, useState} from 'react';
import {getComment} from "../../../api/hackerNewsApi";
import {ItemType} from "../../../types/ItemType";

type CommentsPropsType = {
    id: number
}

export const Comments: React.FC<CommentsPropsType> = (props: CommentsPropsType) => {

    const [comment, setComment] = useState<ItemType>();

    useEffect(() => {
        getComment(String(props.id)).then(response => {
            setComment(response.data);
        });
    }, []);

    return (
        <div>
            <p>by: {comment?.by}</p>
            <p>text: {comment?.text}</p>
            {comment?.kids?.map(id => <Comments key={id} id={id}/>)}
        </div>
    );
};