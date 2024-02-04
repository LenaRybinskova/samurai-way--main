import React from 'react';
import {UsersContainerType} from './UsersContainer';
import styles from './users.module.css'
import axios from 'axios';
import UserPhotoNull from "../../assets/images/usersNull.png"


export class UsersClassComponent extends React.Component<UsersContainerType> {
    // если с конструктором никаким операций не производим, можно его вообще не писать
    /*    constructor(props: UsersContainerType) {
            super(props)
        }*/
    componentDidMount() {
        // все сайд эффекты делаем в этой функ
        // со старта приложения, запрос идет этот и подгружает пользователей и totalCount пользователей
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCount(response.data.totalCount)
        })
    }

    onPageChanged(pageNumber:number){
        this.props.setCurrenPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render(): React.ReactNode {
        // тут можно объект пропс деструктуризировать const {user, follow,unfollow,setUsers} = this.props

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map(p =>
                        <span className={this.props.currentPage === p ? styles.selectedPage : ''}
                              onClick={(event)=>this.onPageChanged(p)}>{p}</span>)}
                </div>

                {this.props.users.map(u => <div key={u.id} className={styles.userContainer}>
                <span>
                    <div><img src={u.photos.small != null ? u.photos.small :UserPhotoNull } className={styles.userPhoto}
                              alt="user"/></div>
                    {u.followed ?
                        <button onClick={() => {
                            this.props.unfollow(u.id)
                        }}>unfollow</button>
                        : <button onClick={() => {
                            this.props.follow(u.id)
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
    }
}

export default UsersClassComponent;

/*
const UsersClassComponent = (props: UsersContainerType) => {

    let getUsers=()=>{
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return (
        <div>
            <button onClick={getUsers}>get Users</button>
            {props.users.map(u => <div key={u.id} className={styles.userContainer}>
                <span>
                    <div><img src={u.photos.small != null? u.photos.small: usersPhoto } className={styles.userPhoto} alt="user"/></div>
                    {u.followed ?
                        <button onClick={() => {
                            props.unfollow(u.id)
                        }}>unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>follow</button>}

                </span>
                <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span><div>{"u.location.country"}</div><div>{"u.location.city"}</div></span>
                </span>
            </div>)}
        </div>
    );
};

export default UsersClassComponent;*/
