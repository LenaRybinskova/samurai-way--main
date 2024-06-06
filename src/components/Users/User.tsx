import React, {FC} from 'react';
import styles from './users.module.css'
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
        <div className={styles.userContainer}>
                       <span>
                           <div>
                               <NavLink to={'/profile/' + u.id}>
                                   <img src={u.photos.small != null ? u.photos.small : UserPhotoNull}
                                        className={styles.userPhoto}
                                        alt="user"/>
                               </NavLink>
                           </div>
                           {u.followed

                               ? <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                   props.unfollowTC(u.id)
                               }
                               }>unfollow</button>
                               : <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                   props.followTC(u.id)
                               }}>follow</button>}
                       </span>
            <span>
                           <span>
                               <div>{u.name}</div><div>{u.status}</div>
                           </span>
                           <span><div>{'u.location.country'}</div><div>{'u.location.city'}</div></span>
                       </span>
        </div>
    );
};

export default User