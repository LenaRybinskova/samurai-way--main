import React from 'react';
import {addPostAC, PostType, updateNewPostTextAC} from '../../../redux/profileReducer';
import {MyPosts} from './MyPosts';
import {AppRootSTateType} from '../../../redux/reduxStore';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';




type MapStateToPropsType = {
    posts: PostType[],
    newPostText: string
}
type MapDispatchToPropsType={
    updateNewPostText: (text: string)=>void,
    addPost:()=>void
}
export type MyPostsContainerPropsType =MapStateToPropsType & MapDispatchToPropsType

// функция которая всего принимает СТЕЙТ всего приложения.
// Запускается каждый раз когда меняется Стейт и формирует новый объект,
// который сравнивается с старым объектом( сравниваются внутренности объектов)
// поэт чтобы был ререндер компоненты надо чтобы редьюсор возвращал копию

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextAC(text))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}
// используем connect
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)





