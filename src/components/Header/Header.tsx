import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';

type HeaderType = {
    isAuth: boolean
    login: string | null
    logoutTC: () => void
}

export const Header = (props: HeaderType) => {
    return (
        <header className={s.header}>
            <img
                src="https://catherineasquithgallery.com/uploads/posts/2021-02/1612893370_194-p-krasnii-prozrachnii-fon-222.png"
                alt="logo"/>
            <div className={s.loginBlock}>
                {/*                если залогинен, показать логин пользователя, если нет то ссылку на страницу ЛОГИН*/}
                {props.isAuth ? <div>{props.login} - <button onClick={props.logoutTC}>Log out</button></div> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}


