import {InjectedFormProps} from 'redux-form/lib/reduxForm';
import {Field, reduxForm} from 'redux-form';
import React from 'react';
import {maxLengthCreator, required} from '../../../../src/utils/validators/validators';
import {Textarea} from '../../../../src/components/common/FormsControls/FormsControls';

const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props: InjectedFormProps) => { // InjectedFormProps  я протипизировала

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder={'Enter your message'}
                    validate={[required, maxLength100]}
                />
            </div>
            <div>
                <button type={'submit'}>send</button>
            </div>
        </form>
    )
}
export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
/*export const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)*/

