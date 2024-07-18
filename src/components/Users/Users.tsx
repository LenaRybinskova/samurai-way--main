import React from 'react';
import {UserType} from '../../redux/usersReducer';
import Paginator from '../common/Paginator/Paginator';
import User from "./User";
import s from "../Users/users.module.css"


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    followingProgress: Number[]
    onPageChanged: (pageNumber: number) => void
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void

}

const Users = (props: UsersPropsType) => {

    return (
        <div className={s.usersPageContainer}>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} portionSize={10}
                       onPageChanged={props.onPageChanged}/>
            {/* юзеров отрисовываем*/}
            <div className={s.usersItemContainer}>
                {props.users.map(u => <User key={u.id} user={u}
                                                                              followTC={props.followTC}
                                                                              unfollowTC={props.unfollowTC}
                                                                              followingProgress={props.followingProgress}/>)}
            </div>
        </div>
    );
};

export default Users;