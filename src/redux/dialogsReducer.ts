import {v1} from 'uuid';
import moment from 'moment';

const SEND_MESSAGE = 'SEND-MESSAGE'

export type DialogType = {
    id: number
    name: string
    avatar: string
}

export type MessageType = {
    id: number
    message: string
    sender: 'me' | 'friend'
    time:string
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
        '31003':[],
        '30571':[],
        '31301': [{id: 1, message: 'Hi', sender: 'friend',
            time:"17:20"}, {id: 2, message: 'How are you?', sender: 'friend',
            time:"17:43"}, {
            id: 3,
            message: 'fine',
            sender: 'me',
            time:"18:01"
        }],
        '31314': [{id: 4, message: 'Hi', sender: 'me',
            time:"12:11"}, {id: 5, message: 'What are you up to today?', sender: 'me',
            time:"12:11"}],
        '31312': [{id: 6, message: 'Hi', sender: 'friend',
            time:"13:10"}, {
            id: 7,
            message: 'Hello, she didn’t do anything and rested all day, how are you?',
            sender: 'friend',
            time:"13:11"
        }, {id: 8, message: 'Ok', sender: 'me',
            time:"15:00"}


        ]
    }
}

export type InitialStateType = {
    dialogs: DialogType[]
    messages: Record<string, MessageType[]>
}

const DialogsReducer = (state: InitialStateType = initialState, action: DialogsReducerAcTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            const id = Math.floor((Math.random() * 100) + 1);
            const timeStamp = moment().format('HH:mm')
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.userId]: [...state.messages[action.userId], {
                        id: id,
                        message: action.newMessageBody,
                        sender: 'me',
                        time:timeStamp
                    }]
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



