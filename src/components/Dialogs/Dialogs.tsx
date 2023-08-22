import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from 'react-router-dom';

export type DialogsType = {
    name: string
    id: number
}
export type MessageType = {
    message: string
}

const Dialog = (props: DialogsType) => {
    const path = '/dialogs' + props.id
    return (
        <div className={s.dialog}><NavLink to={path}>{props.name}</NavLink></div>
    )
}

const Message = (props: MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = () => {

    let dialogs = [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Vera'},
        {id: 4, name: 'Anna'}
    ]

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'fine'},
        {id: 4, message: 'smthng'}
    ]

    let dialogsElements = dialogs.map(d => <Dialog name={d.name} id={d.id}/>)
    let messagesElements = messages.map(m => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
};

export default Dialogs;