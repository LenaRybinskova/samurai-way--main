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

    const ownPhoto = useSelector<AppRootSTateType, string | null>(state => state.auth.smallPhoto)


    return (
        <header className={s.header}>
            <NavLink className={s.topHomeLink} to={`/profile`}><img
                src={ownPhoto ? ownPhoto : usersNull}
                alt="logo"/></NavLink>
            <div className={s.loginBlock}>
                {/*                если залогинен, показать логин пользователя, если нет то ссылку на страницу ЛОГИН*/}
                {props.isAuth ? <div>{props.login} - <button onClick={props.logoutTC}>Log out</button></div> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}


