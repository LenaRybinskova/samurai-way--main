import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

export type InputFormType = {
    newPostText: string
}

const InputForm: React.FC<InjectedFormProps<InputFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component={'input'} name={'newPostText'} placeholder={'Введи текст нового поста'}/>
                    {/*                <textarea value={props.newPostText} onChange={onPostChange}></textarea>*/}
                </div>
                <div>
                    <button type={'submit'}>Add post</button>
                    {/*                <button onClick={onAddPost}>Add post</button>*/}
                </div>
            </div>
        </form>

    );
};

export const ReduxInputForm = reduxForm<InputFormType>({
    form: 'ProfileAddNewPostForm'
})(InputForm)

