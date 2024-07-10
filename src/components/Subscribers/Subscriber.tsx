import React from 'react';
import {UserType} from '../../redux/usersReducer';
import usersNull from '../../assets/images/usersNull.png'
import s from './Subscribers.module.css'
import {NavLink} from 'react-router-dom';


const Subscriber = (props: UserType) => {

    return (
        <>
            <NavLink to={'/profile/' + props.id} >
                <img src={props.photos.small ? props.photos.small : usersNull} className={s.friendAvatar}/>
            </NavLink>
            <div className={s.friendInfo}>
                <div className={s.friendName}><b>{props.name}</b></div>
                <div className={s.friendStatus}><b>Статус:</b> {props.status}</div>
            </div>
        </>
    );
};

export default Subscriber;