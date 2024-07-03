import React from 'react';
import s from './../Dialogs.module.css'
import {MessageType} from '../../../redux/dialogsReducer';
import cn from 'classnames';


export const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={props.sender === 'me' ? s.me : s.friend}>
            {props.message}
        </div>
    )
}

//props.sender === 'me' ? s.me : s.friend
