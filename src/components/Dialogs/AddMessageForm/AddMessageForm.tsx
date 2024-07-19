import {InjectedFormProps} from 'redux-form/lib/reduxForm';
import {Field, reduxForm} from 'redux-form';
import React from 'react';
import {maxLengthCreator} from '../../../../src/utils/validators/validators';
import {Textarea} from '../../../../src/components/common/FormsControls/FormsControls';
import s from '../Dialogs.module.css'

const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props: InjectedFormProps) => { // InjectedFormProps  я протипизировала

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
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
export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
/*export const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)*/

