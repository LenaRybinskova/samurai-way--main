import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../../../src/components/common/FormsControls/FormsControls'

export type InputFormType = {
    newPostText: string
}

const maxLength100 = maxLengthCreator(100)

const AddNewPost: React.FC<InjectedFormProps<InputFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field
                        component={Textarea}
                        name={'newPostText'}
                        placeholder={'Введи текст нового поста'}
                        validate={[required, maxLength100]}
                    />
                </div>
                <div>
                    <button type={'submit'}>Add post</button>
                </div>
            </div>
        </form>

    );
};

export default  reduxForm<InputFormType>({
    form: 'ProfileAddNewPostForm'
})(AddNewPost)

