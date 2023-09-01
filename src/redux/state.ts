// _rerenderEntireTree стал  _callSubscriber
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'


export type AddPostActionType = ReturnType<typeof addPostAС>
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAС>
export type UpdateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>
export type SendMessageAC = ReturnType<typeof sendMessageAC>
export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyACType | SendMessageAC

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
    sideBar: SideBarType
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
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string

}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type SideBarType = {
    friendsOnLine: DialogType[]
}


let store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {
                    id: 1,
                    name: 'Sasha',
                    avatar: 'https://abrakadabra.fun/uploads/posts/2022-02/1644511634_1-abrakadabra-fun-p-smailiki-na-avatarku-prikolnie-2.jpg'
                },
                {id: 2, name: 'Dima', avatar: 'https://klike.net/uploads/posts/2022-08/1659592293_1.jpg'},
                {id: 3, name: 'Vera', avatar: 'https://klike.net/uploads/posts/2022-08/1659592369_3.jpg'},
                {id: 4, name: 'Anna', avatar: 'https://klike.net/uploads/posts/2022-08/1659592333_21.jpg'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'fine'},
                {id: 4, message: 'smthng'}
            ],
            newMessageBody: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'Its my first post', likesCount: 0}
            ],
            newPostText: 'IT-kamasutra'
        },
        sideBar: {
            friendsOnLine: [
                {
                    id: 1,
                    name: 'Sasha',
                    avatar: 'https://abrakadabra.fun/uploads/posts/2022-02/1644511634_1-abrakadabra-fun-p-smailiki-na-avatarku-prikolnie-2.jpg'
                },
                {id: 2, name: 'Dima', avatar: 'https://klike.net/uploads/posts/2022-08/1659592293_1.jpg'},
                {id: 3, name: 'Vera', avatar: 'https://klike.net/uploads/posts/2022-08/1659592369_3.jpg'},
            ]
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer // переопределили функ callSubscriber на "внутренности" rerenderEntireTree, теперь функ _callSubscriber занимается перерисовкой App
        console.log('rerenderEntireTree переопределилась')
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber() // перерисовали стейт /*        this._callSubscriber(this._state)*/

        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber() // перерисовали стейт /*        this._callSubscriber(this._state)*/


        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) { //добавили поступившию строк в тело Message
            this._state.dialogsPage.newMessageBody = action.body
            this._callSubscriber()
        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody
            this._state.dialogsPage.newMessageBody = ''
            this._state.dialogsPage.messages.push({id:6,message:body})
            this._callSubscriber()
        }
    }
}


// ActionCreators
export const addPostAС = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostTextAС = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}
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

export default store;

