import React, {FC} from 'react';
import s from './users.module.css'
import UserPhotoNull from '../../assets/images/usersNull.png'
import {UserType} from '../../redux/usersReducer';
import {NavLink} from 'react-router-dom';


type UserPropsType = {
    user: UserType
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
    followingProgress: Number[]
}

const User: FC<UserPropsType> = ({user, ...props}) => {
    const u = user;
    return (
        <div className={s.userContainer}>
            <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small != null ? u.photos.small : UserPhotoNull}
                     className={s.userPhoto}
                     alt="user"/>
            </NavLink>
            {u.followed
                ? <button className={s.red} disabled={props.followingProgress.some(id => id === u.id)}
                          onClick={() => {
                              props.unfollowTC(u.id)
                          }
                          }>unfollow</button>
                : <button className={s.followButton} disabled={props.followingProgress.some(id => id === u.id)}
                          onClick={() => {
                              props.followTC(u.id)
                          }}>follow</button>}
            <div className={s.userName}>{u.name}</div>
        </div>
    );
};

export default User