import React from 'react';
import {addPostAC, PostType, updateNewPostTextAC} from '../../../redux/profileReducer';
import {MyPosts} from './MyPosts';
import {AppRootSTateType} from '../../../redux/reduxStore';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';


export type MyPostsType = {
    /*    store:StoreType*/
}

/*export const MyPostsContainer = (props: MyPostsType) => {
    return (
        <StoreContext.Consumer>{
            (store:StoreType)=> {
                let state = store.getState()

                const addPost = () => {
                    store.dispatch(addPostAC())
                }

                const onPostChange = (text: string) => {
                    const action = updateNewPostTextAC(text)
                   store.dispatch(action)
                }
                return <MyPosts
                    updateNewPostText={onPostChange}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    )
}*/

type MapStateToPropsType = {
    posts: PostType[],
    newPostText: string
}
type MapDispatchToPropsType={
    updateNewPostText: (text: string)=>void,
    addPost:()=>void
}
export type MyPostsContainerPropsType =MapStateToPropsType & MapDispatchToPropsType

// функция которая всего принимает СТЕЙТ всего приложения
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





