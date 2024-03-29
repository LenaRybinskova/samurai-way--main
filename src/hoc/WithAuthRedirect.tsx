import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../redux/reduxStore';

type MstpType={
    isAuth:boolean
}
let mstp = (state: AppRootSTateType):MstpType => ({
    isAuth: state.auth.isAuth
})

export const  WithAuthRedirect =<T,>(Component: React.ComponentType<T>)=>  {

    const RedirectComponent=(props:MstpType)=> {
        let {isAuth, ...restProps}=props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }
    //обернули коннектом, чтобы получть из Стора isAuth
    let ConnectRedirectComponent = connect(mstp)(RedirectComponent)

    return ConnectRedirectComponent
};








/*
// варриант на классовой компоненету
let mstp = (state: AppRootSTateType) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component: any) => {
//1 конт компонента - класс, редиректит
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to = {'/login'}
            />
            return <Component {...props}
            />
        }
    }

//2 конт компонента - коннект, снабжает класс пропсами isAuth
    let ConnectRedirectComponent = connect(mstp)(RedirectComponent)
    return ConnectRedirectComponent
};*/
