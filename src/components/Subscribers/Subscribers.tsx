import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {UserType} from '../../redux/usersReducer';
import Subscriber from '../Subscribers/Subscriber';
import {getSubscribersTC} from '../../redux/profileReducer';
import s from './Subscribers.module.css'

const Subscribers = () => {

    const isAuth = useSelector<AppRootSTateType, boolean>(state => state.auth.isAuth)
    const friends = useSelector<AppRootSTateType, UserType[]>(state => state.profilePage.friends)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribersTC(1, 3, true))
    }, [dispatch])

    return (
        <div>{isAuth &&
            <div>Friends:
                <div className={s.friendsWrapper}>{friends.map(f => <Subscriber key={f.id} {...f}/>)}</div></div>}
        </div>

    );
};

export default Subscribers;