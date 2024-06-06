import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import styles from '../common/FormsControls/FormsControls.module.css'

export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
//конт компон снабдила в пропсах кучей событий, в тч handleSubmit - для сбора всех данных с форм, без принудит перезагрузки, error-объект и тд
    return (
        <form onSubmit={handleSubmit}>
            {/* input заменили на Field, component какой тег отрисовать,
                   name будет ключом в JSON оъекта, который пойдет на сервер.
                   В Field уже есть onChange, они к name буду собирать данные

                   */}
            {/*            <div>
                { <Field
                component={Input}
                name={'email'}
                placeholder={'email'}
                validate={[required]}
            />}
            </div>*/}
            {createField('email', 'email', required, Input)}
            {createField('password', 'password', required, Input, {type:"password"})}
            {createField(null, 'rememberMe', required, Input, {type:"checkbox"}, "Remember me")}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button type={'submit'}>Login</button>
            </div>
        </form>
    );
};

//ReduxLoginForm функ, которая возвращает ХОК,
// который возвр конт компоненту с новым функционалом для LoginForm
export const ReduxLoginForm = reduxForm<FormDataType>({
// пишем уникальное название формы
    form: 'login'
})(LoginForm)


