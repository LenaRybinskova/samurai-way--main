export type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

export type DialogType = {
    id: number
    name: string
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

}
export type ProfilePageType = {
    posts: PostType[]
}


let state: StateType = {
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Sasha'},
            {id: 2, name: 'Dima'},
            {id: 3, name: 'Vera'},
            {id: 4, name: 'Anna'}
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'fine'},
            {id: 4, message: 'smthng'}
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'Its my first post', likesCount: 0}
        ]
    }
}

export default state;