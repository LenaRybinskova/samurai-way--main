import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {UserType} from '../../redux/usersReducer';
import Subscriber from '../Subscribers/Subscriber';
import {getSubscribersTC} from '../../redux/subscribers-reducer';
import s from './Subscribers.module.css'
import { NavLink } from 'react-router-dom';

const Subscribers = () => {

    const isAuth = useSelector<AppRootSTateType, boolean>(state => state.auth.isAuth)
    const friends = useSelector<AppRootSTateType, UserType[]>(state => state.subscribers.friends)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribersTC(5, 3, true))
    }, [])

    return (
        <div className={s.friendsWrapper}>
            {isAuth &&
                (<>
                    <h3 className={s.friendTitle}>Friends:</h3>
                    <div className={s.friendsList}>{friends.map(f =>
                        <div >
                            <NavLink to={'/profile/' + f.id} className={s.fiendItem} >
                            <Subscriber key={f.id} {...f}/>
                            </NavLink>
                        </div>)}
                    </div>
                </>)
            }
        </div>
    );
};


export default Subscribers;