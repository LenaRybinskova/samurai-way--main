import React from 'react';
import {NavLink} from 'react-router-dom';
import s from '../Dialogs/Dialogs.module.css'

const EmptyWindow = () => {
    return (
        <div>
            Выберите чат
            или <NavLink to={'/users'} className={s.selectUserLink}>выберите пользователя</NavLink>
        </div>
    );
};

export default EmptyWindow;