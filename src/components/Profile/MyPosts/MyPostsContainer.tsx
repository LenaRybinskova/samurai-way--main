import React from 'react';
import {addPostAC, PostType} from '../../../redux/profileReducer';
import {MyPosts} from './MyPosts';
import {AppRootSTateType} from '../../../redux/reduxStore';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';




type MapStateToPropsType = {
    posts: PostType[],
    newPostText: string
}
type MapDispatchToPropsType={
    addPost:(newPostText:string)=>void
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
        addPost: (newPostText:string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}
// используем connect
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)





