import {AllActionTypes} from './store';

const SEND_MESSAGE = 'SEND-MESSAGE'

export type DialogType = {
    id: number
    name: string
    avatar: string
}
export type MessageType = {
    id: number
    message: string
}

let initialState = {
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

}
export type InitialStateType = typeof initialState

const DialogsReducer = (state: InitialStateType = initialState, action: AllActionTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody // сохр в перем то что пришло из инпута
            return {
                ...state,

                messages: [...state.messages,{id: 6, message: body}]//запушили в стейт => теперь отрисуется
            }

        default:
            return state
    }
}

export type SendMessageAC = ReturnType<typeof sendMessageAC>
export type DialogsReducerAcTypes =  SendMessageAC

export const sendMessageAC = (newMessageBody:string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    } as const
}
export default DialogsReducer