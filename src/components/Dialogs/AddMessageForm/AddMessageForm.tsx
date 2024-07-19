import {InjectedFormProps} from 'redux-form/lib/reduxForm';
import {Field, reduxForm} from 'redux-form';
import React from 'react';
import {maxLengthCreator} from '../../../../src/utils/validators/validators';
import {Textarea} from '../../../../src/components/common/FormsControls/FormsControls';
import s from '../Dialogs.module.css'

export type newMessageType={
    newMessageBody:string
}

export type AddMessageFormProps = {
    onSubmit: (newMessage: newMessageType) => void
}

const maxLength100 = maxLengthCreator(100)

const AddMessageForm: React.FC<InjectedFormProps<newMessageType, AddMessageFormProps> & AddMessageFormProps> = (props) => {
    const {handleSubmit, reset} = props

    const addNewMessageSubmit = (formValue: any) => {
        props.onSubmit(formValue)
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(addNewMessageSubmit)}>
                <div className={s.addNewMessageContainer}>
                    <div>
                        <Field
                            component={Textarea}
                            name={'newMessageBody'}
                            placeholder={'Enter your message'}
                            validate={[maxLength100]}
                        />
                    </div>
                    <div>
                        <button type={'submit'}>send</button>
                    </div>
                </div>
            </form>
        </div>

    )
}
export default reduxForm<newMessageType, AddMessageFormProps>({form: 'dialogAddMessageForm'})(AddMessageForm)


