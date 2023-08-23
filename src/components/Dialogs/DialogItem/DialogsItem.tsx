import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom';

export type DialogsType = {
    name: string
    id: number
}


export const DialogItem = (props: DialogsType) => {
    const path = '/dialogs' + props.id
    return (
        <div className={s.dialog}><NavLink to={path}>{props.name}</NavLink></div>
    )
}



