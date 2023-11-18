import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogsItem';
import {StoreType} from '../../redux/reduxStore';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

export type DialogsPropsType = {
    store: StoreType
}

const DialogsContainer: React.FC<DialogsPropsType> = (props) => {

        let state = props.store.getState().dialogsPage

        const onSendMessageClick = () => {
            props.store.dispatch(sendMessageAC())
        }

        const onNewMessageChange = (body:string) => {
            props.store.dispatch(updateNewMessageBodyAC(body))
        }

        return (
           <Dialogs
               onSendMessage={onSendMessageClick} updateNewMessageBody={onNewMessageChange} dialogsPage={state}/>
        );
    }
;

export default DialogsContainer;