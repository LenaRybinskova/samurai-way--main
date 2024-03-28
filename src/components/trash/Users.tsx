import React from 'react';
import {UsersContainerType} from '../Users/UsersContainer';
import styles from '../Users/users.module.css'
import axios from 'axios';
import UserPhotoNull from "../../assets/images/usersNull.png"


const Users = (props: UsersContainerType) => {

    let getUsers=()=>{
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
/*                props.setUsers(response.data.items)*/
            })
        }
    }

    return (
        <div>
            <button onClick={getUsers}>get Users</button>
            {props.users.map(u => <div key={u.id} className={styles.userContainer}>
                <span>
                    <div><img src={u.photos.small != null? u.photos.small: UserPhotoNull } className={styles.userPhoto} alt="user"/></div>
                    {u.followed ?
                        <button onClick={() => {
/*                            props.unfollow(u.id)*/
                        }}>unfollow</button>
                        : <button onClick={() => {
/*                            props.follow(u.id)*/
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

