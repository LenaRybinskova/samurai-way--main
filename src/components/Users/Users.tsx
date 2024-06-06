import React from 'react';
import {UserType} from '../../redux/usersReducer';
import Paginator from '../common/Paginator/Paginator';
import User from "./User";


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
        <div>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>
            {/* юзеров отрисовываем*/}
            {props.users.map(u => <User key={u.id} user={u} followTC={props.followTC} unfollowTC={props.unfollowTC}
                                        followingProgress={props.followingProgress}/>)}
        </div>
    );
};

export default Users;