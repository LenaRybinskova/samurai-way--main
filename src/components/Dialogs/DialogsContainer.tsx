import React from 'react';
import {DialogsType, DialogType, sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {Dispatch} from 'redux';

/*export type DialogsPropsType = {
    /!*    store: StoreType*!/
}

const DialogsContainer: React.FC<DialogsPropsType> = (props: DialogsPropsType) => {

    return (
        <StoreContext.Consumer>{
            (store:StoreType)=> {
                let state = store.getState().dialogsPage

                const onSendMessageClick = () => {
                    store.dispatch(sendMessageAC())
                }

                const onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyAC(body))
                }
                return <Dialogs onSendMessage={onSendMessageClick} updateNewMessageBody={onNewMessageChange}
                                dialogsPage={state}/>
            }
        }
        </StoreContext.Consumer>
    )
}*/

type mapStateToPropsType={
    dialogsPage: DialogsType
}
type mapDispatchToPropsType={
    updateNewMessageBody:(body: string) =>void,
    sendMessage:() =>void
}
export type DialogsContainerType= mapStateToPropsType & mapDispatchToPropsType


// СВОЙСТВА
let mapStateToProps = (state: AppRootSTateType):mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
// КОЛЛЛБЕКИ
let mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {dispatch(updateNewMessageBodyAC(body))},
        sendMessage: () => {dispatch(sendMessageAC())}
    }
}
//этими функциями(через функцию коннект) дали числой компон Dialogs все что нужно. По сути создали контейнерную компоненту
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)




