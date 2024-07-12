import React from 'react';
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../../../src/components/common/FormsControls/FormsControls'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import s from '../MyPosts/MyPosts.module.css'

export type InputFormType = {
    newPostText: string
}
export type AddNewPostProps = {
    onSubmit: (newPostText: InputFormType) => void
}

const maxLength100 = maxLengthCreator(100)


const AddNewPost: React.FC<InjectedFormProps<InputFormType, AddNewPostProps> & AddNewPostProps> = (props) => {

    const {handleSubmit, reset} = props;

    const onSubmitHandle = (value: InputFormType) => {
        props.onSubmit(value);
        reset();
    }


    return (
        <div className={s.newPostContainer}>
            <form onSubmit={handleSubmit(onSubmitHandle)}>
                <div className={s.newPostBlock}>
                    <div className={s.newPostTextarea}>
                        <Field
                            component={Textarea}
                            name={'newPostText'}
                            placeholder={'Введи текст нового поста'}
                            validate={[required, maxLength100]}/>
                    </div>
                    <div className={s.addNewPostButtonContainer}>
                        <button className={s.addNewPostButton} type={'submit'}>Add post</button>
                    </div>
                </div>
            </form>
        </div>

    );
};
export default reduxForm<InputFormType, AddNewPostProps>({
    form: 'ProfileAddNewPostForm'
})(AddNewPost)

