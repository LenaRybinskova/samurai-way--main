import React from 'react';
import styles from './users.module.css'
import UserPhotoNull from '../../assets/images/usersNull.png'
import {toggleIsFollowingProgress, UserType} from '../../redux/usersReducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {userAPI} from '../../api/api';


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    followingProgress:Number[]
    onPageChanged: (pageNumber: number) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
    toggleIsFollowingProgress:(userId:number,isFetching:boolean) => void
}

const Users = (props: UsersPropsType) => {


    //высчит кол-во страниц для пагинации
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
console.log("isFollowingProgress", props.followingProgress)
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
                               //если текущ ИД совпадает с каким то из списка followingProgress, то значит с юзером что то происх - ТРУ дизебл
                               ? <button disabled={props.followingProgress.some(id=>id === u.id)} onClick={() => {
                                   props.toggleIsFollowingProgress(u.id,true) // если изФетчнг-тру значит будем добавля ид в followingProgress
                                   userAPI.unfollow(u.id).then(res => {
                                       if (res.data.resultCode === 0) {
                                           props.unfollow(u.id) //это диспач в Редакс
                                       }
                                       props.toggleIsFollowingProgress(u.id,false)  // если изФетчнг-фолс значит будем удалять ид в followingProgress
                                   })
                               }
                               }>unfollow</button>
                               : <button disabled={props.followingProgress.some(id=>id ===u.id)} onClick={() => {
                                   props.toggleIsFollowingProgress(u.id,true)
                                   userAPI.follow(u.id).then(res => {
                                       if (res.data.resultCode === 0) {
                                           props.follow(u.id) //это диспач в Редакс
                                       }
                                       props.toggleIsFollowingProgress(u.id,false)
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