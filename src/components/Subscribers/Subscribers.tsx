import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {UserType} from '../../redux/usersReducer';
import Subscriber from '../Subscribers/Subscriber';
import {getSubscribersTC} from '../../redux/subscribers-reducer';
import s from './Subscribers.module.css'

const Subscribers = () => {

    const isAuth = useSelector<AppRootSTateType, boolean>(state => state.auth.isAuth)
    const friends = useSelector<AppRootSTateType, UserType[]>(state => state.subscribers.friends)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribersTC(7, 3, true))
    }, [dispatch])

    return (
        <div className={s.friendsWrapper}>
            {isAuth &&
                (<>
                    <h3 className={s.friendTitle}>Friends:</h3>
                    <div className={s.friendsList}>{friends.map(f =>
                        <div className={s.fiendItem}><Subscriber key={f.id} {...f}/></div>)}
                    </div>
                </>)
            }
        </div>
    );
};


export default Subscribers;