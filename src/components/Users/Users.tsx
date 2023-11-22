import React from 'react';
import {UsersContainerType} from './UsersContainer';
import styles from './users.module.css'


const Users = (props: UsersContainerType) => {

    //вот это уже как бы сайд эффект. Чист функ может диспатчить, но иходя из своих данных
    // а тут получается, что функ должан сначала посмортреть длину и потом принять решение диспатчить или нет, это не читс функ
   if(props.users.length===0){
        props.setUsers([{
                id: 1,
                photoUrl: 'https://sneg.top/uploads/posts/2023-06/1687462693_sneg-top-p-kruglie-avatarki-krasivo-26.jpg',
                followed: false,
                fullName: 'Sasha',
                status: 'i am a boss',
                location: {city: 'Zelenograd', country: 'RF'}
            }, {
                id: 2,
                photoUrl: 'https://coinmania.com/wp-content/uploads/2022/10/64001-cryptocurrency-currency-doge-dogecoin-digital-hd-image-free-png.png',
                followed: true,
                fullName: 'Dima',
                status: 'i am a boss2',
                location: {city: 'Zhuk', country: 'RF'}
            },
                {
                    id: 3,
                    photoUrl: 'https://w7.pngwing.com/pngs/221/282/png-transparent-desktop-youtube-display-resolution-music-handheld-devices-cool-designs-computer-wallpaper-special-effects-snout.png',
                    followed: false,
                    fullName: 'Vera',
                    status: 'i am a boss3',
                    location: {city: 'Serpuchov', country: 'RF'}
                },
                {
                    id: 4,
                    photoUrl: 'https://pushinka.top/uploads/posts/2023-04/1681654281_pushinka-top-p-kruglie-avatarki-dlya-ds-pinterest-65.jpg',
                    followed: true,
                    fullName: 'Anna',
                    status: 'i am a boss4',
                    location: {city: 'Zelenograd', country: 'RF'}
                }]
        )
    }


    return (
        <div>
            {props.users.map(u => <div key={u.id} className={styles.userContainer}>
                <span>
                    <div><img src={u.photoUrl} className={styles.userPhoto} alt="user"/></div>
                    {u.followed ?
                        <button onClick={() => {props.unfollow(u.id)}}>unfollow</button>
                        : <button onClick={() => {props.follow(u.id)}}>follow</button>}

                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div><div>{u.status}</div>
                    </span>
                    <span><div>{u.location.country}</div><div>{u.location.city}</div></span>
                </span>
            </div>)}
        </div>
    );
};

export default Users;