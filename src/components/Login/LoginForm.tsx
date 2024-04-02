import React from 'react';
import {Field, reduxForm} from 'redux-form';

const LoginForm = (props:any) => {
//конт компон снабдила в пропсах кучей событий, в тч handleSubmit - для сбора всех данных с форм, без принудит перезагрузки
    return (
            <form onSubmit={props.handleSubmit}>
{/*                input заменили на Field, component какой тег отрисовать,
                   name будет ключом в JSON оъекта, который пойдет на сервер.
                   В Field уже есть onChange, они к name буду собирать данные

                   */}
                <div><Field component={"input"} name={"login"} placeholder={"login"} /></div>
                <div><Field component={"input"} name={"password"}  placeholder={"password"} /></div>
                <div><Field component={"input"} name={"Remember"}  type="checkbox"  />Remember me</div>
                <div>
                    <button type={"submit"}>Login</button>
                </div>
            </form>
    );
};

//ReduxLoginForm функ, которая возвращает ХОК,
// который возвр конт компоненту с новым функционалом для LoginForm
export const ReduxLoginForm=reduxForm({
// пишем уникальное название формы
    form:"login"
})(LoginForm)