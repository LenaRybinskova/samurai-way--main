import {AllActionTypes} from './store';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export type DialogsType = {
    dialogs: DialogType[],
    messages: MessageType[],
    newMessageBody: string
}
export type DialogType = {
    id: number
    name: string
    avatar: string
}
export type MessageType = {
    id: number
    message: string
}

let initialState: DialogsType = {
    dialogs: [
        {
            id: 1,
            name: 'Sasha',
            avatar: 'https://abrakadabra.fun/uploads/posts/2022-02/1644511634_1-abrakadabra-fun-p-smailiki-na-avatarku-prikolnie-2.jpg'
        },
        {id: 2, name: 'Dima', avatar: 'https://klike.net/uploads/posts/2022-08/1659592293_1.jpg'},
        {id: 3, name: 'Vera', avatar: 'https://klike.net/uploads/posts/2022-08/1659592369_3.jpg'},
        {id: 4, name: 'Anna', avatar: 'https://klike.net/uploads/posts/2022-08/1659592333_21.jpg'}
    ] as DialogType[],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'fine'},
        {id: 4, message: 'smthng'}
    ] as MessageType[],
    newMessageBody: ''
}
export type InitialStateType = typeof initialState

const DialogsReducer = (state: InitialStateType = initialState, action: AllActionTypes): InitialStateType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
             return {
                ...state,newMessageBody:action.body // введеная строка в инпут сохранилась в newMessageBody*/
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody // сохр в перем то что пришло из инпута
            return {
                ...state,
                newMessageBody: '',// зачистили поле
                messages: [...state.messages,{id: 6, message: body}]//запушили в стейт => теперь отрисуется
            }

        default:
            return state
    }
}
export type UpdateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>
export type SendMessageAC = ReturnType<typeof sendMessageAC>
export type DialogsReducerAcTypes = UpdateNewMessageBodyACType | SendMessageAC

export const updateNewMessageBodyAC = (newMessage: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: newMessage
    } as const
}
export const sendMessageAC = () => {
    return {
        type: SEND_MESSAGE
    } as const
}
export default DialogsReducer