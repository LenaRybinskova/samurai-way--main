import React from 'react';
import s from './Post.module.css'
import userNull from '../../../../assets/images/usersNull.png'
import like from '../../../../assets/icons/like.png'

type PostType = {
    message?: string
    likesCount: number
    currentProfilePhoto: string
}


export const Post: React.FC<PostType> = (props) => {

    return (
        <div className={s.item}>
            <img className={s.itemAvatar} src={props.currentProfilePhoto ? props.currentProfilePhoto : userNull}/>
            <div className={s.itemText}>
                <span className={s.itemMessage}>{props.message}</span>
                <div className={s.itemLikes}>
                    <img src={like} className={s.likeImg}/>
                    {props.likesCount}
                </div>
            </div>
        </div>
    )
}
