import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom';

export type DialogsType = {
    name: string
    id: number
    avatar:string
}


export const DialogItem: React.FC<DialogsType> = (props) => {
    const path = '/dialogs' + props.id
    return (
        <div className={s.dialog}>
            <img src={props.avatar}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}



