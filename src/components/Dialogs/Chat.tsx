import React from 'react';
import AddMessageForm from '../Dialogs/AddMessageForm/AddMessageForm';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {MessageType, sendMessageAC} from '../../redux/dialogsReducer';
import s from './Dialogs.module.css'
import {Message} from '../Dialogs/Message/Message';
import EmptyWindow from '../Dialogs/EmptyWindow';

const Chat = (props: any) => {

    const {userId} = useParams<{ userId: string }>();
    console.log('userId', userId)
    const messagesElements = useSelector<AppRootSTateType, MessageType[]>(state => state.dialogsPage.messages[userId])
    const dispatch = useDispatch()

    console.log('messagesElements', messagesElements)

    const addNewMessage = (data: any) => {
        dispatch(sendMessageAC(userId, data.newMessageBody))
    }

    return (
        <>
            <div className={s.chat}>{
                messagesElements
                ? messagesElements.map((m: MessageType) => <Message key={m.id} {...m}/> )
                : <EmptyWindow/>}
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </>
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
