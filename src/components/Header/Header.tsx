import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';

type HeaderType = {
    isAuth: boolean
    login: string | null
}

export const Header = (props: HeaderType) => {
    return (
        <header className={s.header}>
            <img
                src="https://catherineasquithgallery.com/uploads/posts/2021-02/1612893370_194-p-krasnii-prozrachnii-fon-222.png"
                alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}


