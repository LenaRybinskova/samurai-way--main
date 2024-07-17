import React from 'react';
import s from './../Dialogs.module.css'
import {MessageType} from '../../../redux/dialogsReducer';


export const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={`${s.messageContainer} ${props.sender === 'me' ? s.me : s.friend}`}>
            <div className={s.message}>{props.message}</div>
            <div className={s.chatMessageTimestamp}>{props.time}</div>
        </div>
    )
}

//props.sender === 'me' ? s.me : s.friend
