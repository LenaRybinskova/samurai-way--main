import React, {useContext} from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import usersNull from '../../assets/images/usersNull.png'
import {ThemeContext} from '../../context/ThemeProvider';

type HeaderType = {
    isAuth: boolean
    login: string | null
    logoutTC: () => void
}

export const Header = (props: HeaderType) => {

    const ownAccountPhoto = useSelector<AppRootSTateType, string | null>(state => state.auth.smallPhoto)


    console.log("владелец аккаунта", ownAccountPhoto)
    return (
        <header className={s.header}>
            <NavLink className={s.topHomeLink} to={`/profile`}>
                <img src={ownAccountPhoto ? ownAccountPhoto : usersNull} alt="logo"/></NavLink>
            <div className={s.loginBlock}>
                {/*                если залогинен, показать логин пользователя, если нет то ссылку на страницу ЛОГИН*/}
                {props.isAuth
                    ? <div >
                        <span className={s.loginName}>{props.login}</span>
                        <button className={s.loginButton} onClick={props.logoutTC}>Log out</button>
                    </div>
                    : <div><NavLink to={'/login'}>Login</NavLink></div>}
            </div>
        </header>
    )
}


