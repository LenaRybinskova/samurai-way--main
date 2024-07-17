import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import styles from '../common/FormsControls/FormsControls.module.css'
import s from '../Login/Login.module.css'

export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha?: string | null

}
export type OwnPropsType = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType> = ({
                                                                                               handleSubmit,
                                                                                               error,
                                                                                               captchaUrl
                                                                                           }) => {
//конт компон снабдила в пропсах кучей событий, в тч handleSubmit - для сбора всех данных с форм, без принудит перезагрузки, error-объект и тд
    return (
        <form onSubmit={handleSubmit}>
            {/* input заменили на Field, component какой тег отрисовать,
                   name будет ключом в JSON оъекта, который пойдет на сервер.
                   В Field уже есть onChange, они к name буду собирать данные

                   */}
            <div className={s.loginFormContainer}>
                <div className={s.logininputEmail}>{createField('email', 'email', [required], Input)}</div>
                {createField('password', 'password', [required], Input, {type: 'password'})}
                <div className={s.rememberMeContainer}>Remember
                    me:<span>{createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}</span>
                </div>

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField('enter symbolr from image', 'captcha', [required], Input)}

                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button type={'submit'}>Login</button>
                </div>
            </div>
        </form>
    );
};

//ReduxLoginForm функ, которая возвращает ХОК,
// который возвр конт компоненту с новым функционалом для LoginForm
export const ReduxLoginForm = reduxForm<FormDataType, OwnPropsType>({
// пишем уникальное название формы
    form: 'login'
})(LoginForm)


// ()=> ''