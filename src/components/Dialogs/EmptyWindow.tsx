import React from 'react';
import {NavLink} from 'react-router-dom';

const EmptyWindow = () => {
    return (
        <div>
            Выберите чат
            или <NavLink to={'/users'}>выберите пользователя</NavLink>
        </div>
    );
};

export default EmptyWindow;