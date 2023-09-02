import ProfileReducer, {AddPostActionType, ProfileReducerAcTypes, UpdateNewPostTextActionType} from './ProfileReducer';
import DialogsReducer, {DialogsReducerAcTypes, SendMessageAC, UpdateNewMessageBodyACType} from './DialogsReducer';

export type AllActionTypes = UpdateNewMessageBodyACType | SendMessageAC | AddPostActionType | UpdateNewPostTextActionType

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (callback: () => void) => void
    dispatch: (action: AllActionTypes ) => void

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
        this._callSubscriber = observer
        console.log('rerenderEntireTree переопределилась')
    },
    dispatch(action) {
        console.log("action", action)
        this._state.profilePage = ProfileReducer(this._state.profilePage, action)
        this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}


export default store;

/*if (action.type === ADD_POST) {
    let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
    }
    this._state.profilePage.posts.push(newPost)
    this._state.profilePage.newPostText = ''
    this._callSubscriber() // перерисовали стейт /!*        this._callSubscriber(this._state)*!/

} else if (action.type === UPDATE_NEW_POST_TEXT) {
    this._state.profilePage.newPostText = action.newText
    this._callSubscriber() // перерисовали стейт /!*        this._callSubscriber(this._state)*!/


} else if (action.type === UPDATE_NEW_MESSAGE_BODY) { //добавили поступившию строк в тело Message
    this._state.dialogsPage.newMessageBody = action.body
    this._callSubscriber()
} else if (action.type === SEND_MESSAGE) {
    let body = this._state.dialogsPage.newMessageBody
    this._state.dialogsPage.newMessageBody = ''
    this._state.dialogsPage.messages.push({id:6,message:body})
    this._callSubscriber()
}*/