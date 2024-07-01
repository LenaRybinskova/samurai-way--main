import React, {useEffect} from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogsItem';
import {DialogsContainerType} from './DialogsContainer';
import AddMessageForm from '../../../src/components/Dialogs/AddMessageForm/AddMessageForm';


/*const Dialogs: React.FC<DialogsType> = (props) => {*/
export const Dialogs = (props: DialogsContainerType) => {


        let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}
                                                                             avatar={d.avatar}/>)
        let messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

        const addNewMessage = (data: any) => {
            props.sendMessage(data.newMessageBody)
        }

        return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                </div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        );
    }
;


/*
const AddMessageForm = (props: InjectedFormProps) => { // InjectedFormProps  я протипизировала

    const maxLength100 = maxLengthCreator(100)

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'} validate={[requiredField,maxLength100]}/>
            </div>
            <div>
                <button type={'submit'}>send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;*/
