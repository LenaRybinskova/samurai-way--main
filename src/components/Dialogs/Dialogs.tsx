import React from 'react';
import s from "./Dialogs.module.css"
import {DialogItem} from './DialogItem/DialogsItem';
import {DialogsContainerType} from './DialogsContainer';
import {useSelector} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {UserType} from '../../redux/usersReducer';
import usersNull from '../../assets/images/usersNull.png'
import Chat from './Chat';


/*const Dialogs: React.FC<DialogsType> = (props) => {*/
export const Dialogs = (props: DialogsContainerType) => {

        const friends = useSelector<AppRootSTateType, UserType[]>(state => state.subscribers.friends)

        const dialogsElements = friends.map(d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.photos.small ? d.photos.small : usersNull}/>)


        return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.chatContainer}><Chat sendMessage={props.sendMessage}/></div>
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
