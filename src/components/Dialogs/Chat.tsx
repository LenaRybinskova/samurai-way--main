import React from 'react';
import {Message} from '../Dialogs/Message/Message';
import AddMessageForm from '../Dialogs/AddMessageForm/AddMessageForm';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {MessageType, sendMessageAC} from '../../redux/dialogsReducer';
import s from './Dialogs.module.css'

const Chat = (props: any) => {

    const {userId} = useParams<{ userId: string }>();

    const messagesElements = useSelector<AppRootSTateType, MessageType[]>(state => state.dialogsPage.messages[userId])
    const dispatch = useDispatch()

    const addNewMessage = (data: any) => {
        dispatch(sendMessageAC(userId, data.newMessageBody))
    }

    return (
        <div className={s.message}>
            <div>{messagesElements.map(m => <Message key={m.id} message={m.message}/>)}</div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
};

export default Chat;

/*

cons
    const messages = useSelector<AppRootSTateType, MessageType[]>((state) => state.dialogsPage.messages[(userId)]);

    const messagesElements = messages.map((message) => (
        <div key={message.id}>{message.message}</div>
    ));

// const messages = useSelector<AppRootSTateType, MessageType[]>((state) => state.dialogsPage.messages[userId]);


    let messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)*/
