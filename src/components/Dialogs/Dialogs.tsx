import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogsItem';
import {StoreType} from '../../redux/state';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/DialogsReducer';

export type DialogsPropsType = {
    store: StoreType
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

        let state = props.store.getState().dialogsPage

        let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>)
        let messagesElements = state.messages.map(m => <Message message={m.message}/>)
        let newMessageBody = state.newMessageBody

        const onSendMessageClick = () => {
            props.store.dispatch(sendMessageAC())
        }

        const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            let body = e.currentTarget.value
            props.store.dispatch(updateNewMessageBodyAC(body))
        }

        return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                </div>
                <div>
                    <div><textarea onChange={onNewMessageChange} placeholder={'Enter your message'}
                                   value={newMessageBody}></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>send</button>
                    </div>
                </div>
            </div>
        );
    }
;

export default Dialogs;