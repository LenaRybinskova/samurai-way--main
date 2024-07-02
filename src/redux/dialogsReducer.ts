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

let initialState: InitialStateType = {
    dialogs: [
        {
            id: 31000,
            name: 'Sasha',
            avatar: 'https://abrakadabra.fun/uploads/posts/2022-02/1644511634_1-abrakadabra-fun-p-smailiki-na-avatarku-prikolnie-2.jpg'
        },
        {id: 30880, name: 'Dima', avatar: 'https://klike.net/uploads/posts/2022-08/1659592293_1.jpg'},
        {id: 30575, name: 'Vera', avatar: 'https://klike.net/uploads/posts/2022-08/1659592369_3.jpg'},
        {id: 4, name: 'Anna', avatar: 'https://klike.net/uploads/posts/2022-08/1659592333_21.jpg'}
    ] as DialogType[],
    messages: {
        '31000': [{id: 1, message: 'Hi'}, {id: 2, message: 'How are you?'}, {id: 3, message: 'fine'}],
        '30880': [{id: 4, message: 'Hi'}, {id: 5, message: 'What are you up to today?'}],
        '30575': [{id: 6, message: 'Hi'}]
    }
}

export type InitialStateType = {
    dialogs: DialogType[]
    messages:Record<string, MessageType[]>
}

const DialogsReducer = (state: InitialStateType = initialState, action: DialogsReducerAcTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            return {...state,
                messages: {
                    ...state.messages,
                    [action.userId]: [...state.messages[action.userId], {id: 8, message: action.newMessageBody}]
                }
            }
        default:
            return state
    }
}

export type SendMessageAC = ReturnType<typeof sendMessageAC>
export type DialogsReducerAcTypes = SendMessageAC

export const sendMessageAC = (userId: string, newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        userId,
        newMessageBody
    } as const
}
export default DialogsReducer



