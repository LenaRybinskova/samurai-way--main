import React from 'react';
import {InitialStateType, sendMessageAC} from '../../redux/dialogsReducer';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {compose, Dispatch} from 'redux';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect';
import {Dialogs} from '../Dialogs/Dialogs'

type MapStateToPropsType = {
    dialogsPage: InitialStateType
    /*    isAuth:boolean*/
}
type MapDispatchToPropsType = {

    sendMessage: (userId: string, newMessageBody: string) => void
}
export type DialogsContainerType = MapStateToPropsType & MapDispatchToPropsType
// СВОЙСТВА
let mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
// КОЛЛЛБЕКИ
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (userId: string, newMessageBody: string) => {
            dispatch(sendMessageAC(userId, newMessageBody))
        }
    }
}


/*//HOC
const DialogsRedirectComponent=WithAuthRedirect<DialogsContainerType>(Dialogs)


//этими функциями(через функцию коннект) дали числой компон Dialogs все что нужно. По сути создали контейнерную компоненту
 const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsRedirectComponent)*/

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

