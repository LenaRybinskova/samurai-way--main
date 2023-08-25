import React from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogsItem';
import {DialogsPageType, DialogType, MessageType} from '../../redux/state';

export type DialogsPropsType = {
    state: DialogsPageType
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const newMessageHandler = () => {
        if (newPostElement.current) {
            alert(newPostElement.current.value)
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea ref={newPostElement}></textarea>
                <button onClick={newMessageHandler}>new message</button>
            </div>
        </div>
    );
};

export default Dialogs;