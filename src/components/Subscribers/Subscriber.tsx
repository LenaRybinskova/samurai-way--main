import React from 'react';
import {UserType} from '../../redux/usersReducer';
import usersNull from '../../assets/images/usersNull.png'
import s from './Subscribers.module.css'
import {NavLink} from 'react-router-dom';


const Subscriber = (props: UserType) => {


    return (
        <NavLink to={'/profile/' + props.id}>
                <img src={props.photos.small ? props.photos.small : usersNull} className={s.friendAvatar}/>
                <div className={s.friendName}>{props.name}</div>
        </NavLink>
    );
};

export default Subscriber;