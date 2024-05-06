import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogsItem';
import {DialogsContainerType} from './DialogsContainer';
import {Field, reduxForm} from 'redux-form';


/*const Dialogs: React.FC<DialogsType> = (props) => {*/
const Dialogs = (props: DialogsContainerType) => {

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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        );
    }
;


const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
            </div>
            <div>
                <button type={'submit'}>send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;