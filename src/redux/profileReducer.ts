import {AllActionTypes} from './store';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'


export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}

// стартовый стейт
let initialState= {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post', likesCount: 0}
    ] as PostType[],
    newPostText: 'IT-kamasutra'
}

export type initialStateType= typeof initialState


export const profileReducer = (state: initialStateType = initialState, action: AllActionTypes): initialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export type ProfileReducerAcTypes = AddPostActionType | UpdateNewPostTextActionType

export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>


// ActionCreators
export const addPostAC = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}

export default profileReducer;