import React from 'react'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';



export type ProfileType = {
/*    store: StoreType //аналог initialStateType из profileReducer.ts*/

}
export const Profile = (props: ProfileType) => {

    return (
        <div>Main content
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
