import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogsItem';
import {StoreType} from '../../redux/reduxStore';
import {DialogType, MessageType, sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogsReducer';
import {DialogsPageType} from '../../redux/store';

export type DialogsPropsType = {
    onSendMessage:()=>void
    updateNewMessageBody:(body:string)=>void
    dialogsPage:{
        dialogs:DialogType[],
        messages:MessageType[],
        newMessageBody:string
    }
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    console.log(props)
        let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>)
    let messagesElements=props.dialogsPage.messages.map(m=><Message message={m.message}/>)
    let newMessageBody=props.dialogsPage.newMessageBody


        const onSendMessageClick = () => {
            props.onSendMessage()
        }

        const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            let body = e.currentTarget.value
           props.updateNewMessageBody(body)
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