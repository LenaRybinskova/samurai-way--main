import React from 'react';
import {InitialStateType, sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {Dispatch} from 'redux';


type MapStateToPropsType ={
    dialogsPage: InitialStateType
    isAuth:boolean
}
type MapDispatchToPropsType ={
    updateNewMessageBody:(body: string) =>void,
    sendMessage:() =>void
}
export type DialogsContainerType= MapStateToPropsType & MapDispatchToPropsType


// СВОЙСТВА
let mapStateToProps = (state: AppRootSTateType):MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth:state.auth.isAuth
    }
}
// КОЛЛЛБЕКИ
let mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {dispatch(updateNewMessageBodyAC(body))},
        sendMessage: () => {dispatch(sendMessageAC())}
    }
}
//этими функциями(через функцию коннект) дали числой компон Dialogs все что нужно. По сути создали контейнерную компоненту
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)




