import React from 'react';
import {StoreType} from '../../redux/reduxStore';
import {sendMessageAC, updateNewMessageBodyAC} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {StoreContext} from '../../storeContext';

export type DialogsPropsType = {
/*    store: StoreType*/
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
}


export default DialogsContainer;


