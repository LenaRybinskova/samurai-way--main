import {ProfileReducerAcTypes,} from './profileReducer';
import {DialogsReducerAcTypes} from './dialogsReducer';
import {UsersReducerAcTypes} from './usersReducer';
import {AuthReducerAcTypes} from './auth-reducer';
import {stopSubmit} from 'redux-form';
import {AppReducerType} from '../redux/app-reducer';

export type StopSubmitActionType = ReturnType<typeof stopSubmit>;

export type AllActionTypes =
    | DialogsReducerAcTypes
    | ProfileReducerAcTypes
    | AuthReducerAcTypes
    | UsersReducerAcTypes
    | StopSubmitActionType
    | AppReducerType


/*type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (callback: () => void) => void
    dispatch: (action: AllActionTypes ) => void

}
type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
    sideBar: SideBarType
}

type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string

}

type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}

type SideBarType = {
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


export default store;*/

