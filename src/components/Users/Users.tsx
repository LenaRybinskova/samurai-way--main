import React from 'react';
import styles from './users.module.css'
import UserPhotoNull from '../../assets/images/usersNull.png'
import {UserType} from '../../redux/usersReducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    onPageChanged: (pageNumber: number) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}

const Users = (props: UsersPropsType) => {


    //высчит кол-во страниц для пагинации
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {/*pagination*/}
                {pages.map(p =>
                    <span className={props.currentPage === p ? styles.selectedPage : ''}
                          onClick={(event) => props.onPageChanged(p)}>{p}</span>)}
            </div>


            {/* юзеров отрисовываем*/}
            {props.users.map(u => <div key={u.id} className={styles.userContainer}>
                       <span>
                           <div>
                               <NavLink to={'/profile/' + u.id}>
                                   <img src={u.photos.small != null ? u.photos.small : UserPhotoNull}
                                        className={styles.userPhoto}
                                        alt="user"/>
                               </NavLink>

                           </div>
                           {u.followed
                               ? <button onClick={() => {
                                   console.log("unfollow")
                                   axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,  {withCredentials: true}).then(res => {
                                       if (res.data.resultCode === 0) {
                                           props.unfollow(u.id) //это диспач в Редакс
                                       }
                                   })
                               }
                               }>unfollow</button>
                               : <button onClick={() => {
                                   console.log("follow")
                                   axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},{withCredentials: true}).then(res => {
                                       if (res.data.resultCode === 0) {
                                           props.follow(u.id) //это диспач в Редакс
                                       }
                                   })

                               }}>follow</button>}
                       </span>
                <span>
                           <span>
                               <div>{u.name}</div><div>{u.status}</div>
                           </span>
                           <span><div>{'u.location.country'}</div><div>{'u.location.city'}</div></span>
                       </span>
            </div>)}
        </div>
    );
};

export default Users;