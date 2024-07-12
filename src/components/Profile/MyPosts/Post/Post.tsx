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
    const timestamp=new Date()

    console.log("время", timestamp.getHours())

    return (
        <div className={s.item}>
            <img className={s.itemAvatar} src={props.currentProfilePhoto ? props.currentProfilePhoto : userNull}/>
            <div className={s.itemText}>
                <div className={s.itemMessageWrapper}>
                    <div className={s.itemMessage}>
                        <div className={s.itemTextMessage}>{props.message}</div>
                        <div className={s.itemTextMessageTime}>13:00</div>
                    </div>
                </div>
                <div className={s.itemLikes}>
                    <img src={like} className={s.likeImg}/>
                    {props.likesCount}
                </div>
            </div>
        </div>
    )
}
