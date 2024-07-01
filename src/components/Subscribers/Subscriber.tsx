import React from 'react';
import {UserType} from '../../redux/usersReducer';
import usersNull from '../../assets/images/usersNull.png'
import s from './Subscribers.module.css'


const Subscriber = (props: UserType) => {

    return (
        <div>
            <img src={props.photos.small ? props.photos.small : usersNull} className={s.friendAvatar}/>
            <div className={s.friendName}>{props.name}</div>
        </div>
    );
};

export default Subscriber;