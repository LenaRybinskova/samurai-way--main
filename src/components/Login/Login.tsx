import React from 'react';
import {FormDataType, ReduxLoginForm} from './LoginForm';
import {loginTC} from '../../../src/redux/auth-reducer';
import {connect} from 'react-redux';
import {LoginType} from '../../api/api';
import {Redirect} from 'react-router-dom';
import {AppRootSTateType} from '../../redux/reduxStore';

type LoginProps = {
    loginTC: (value: LoginType) => void
    isAuth: boolean
    captchaUrl:string|null
}
type MstpType = {
    isAuth: boolean
    captchaUrl:string|null
}

const Login = (props: LoginProps) => {

    const onSubmit = (formData: FormDataType) => {
        console.log('данные из формы логин', formData)
        props.loginTC(formData)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};
const mstp = (state: AppRootSTateType): MstpType => ({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

export default connect(mstp, {loginTC})(Login)