import React from 'react';
import {FormDataType, ReduxLoginForm} from './LoginForm';

const Login = () => {
    const onSubmit=(formData:FormDataType)=>{
console.log("данные из форм",formData)
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;