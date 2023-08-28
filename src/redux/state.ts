// локальная заглушка rerenderEntireTree, чтобы можно было в subscribe написать так: rerenderEntireTree = callBack
let rerenderEntireTree = (state:RootStateType) => {
    console.log('state changed')
}


//функция-посредник-НАБЛЮДАТЕЛЬ: туда передаем коллбек(внутринности др функции) и она их переприсваивает функции rerenderEntireTree
export const subscribe = (observer: (state:RootStateType)=>void) => {
    rerenderEntireTree = observer
    console.log("rerenderEntireTree уже переопределилась")
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

}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type SideBarType = {
    friendsOnLine: DialogType[]
}

let state: RootStateType = {
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
        ]
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
}


export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state;