import {AllActionTypes, SideBarType} from './store';

let initialState: SideBarType = {
    friendsOnLine: [
        {id: 1, name: 'Sasha', avatar: 'https://abrakadabra.fun/uploads/posts/2022-02/1644511634_1-abrakadabra-fun-p-smailiki-na-avatarku-prikolnie-2.jpg'},
        {id: 2, name: 'Dima', avatar: 'https://klike.net/uploads/posts/2022-08/1659592293_1.jpg'},
        {id: 3, name: 'Vera', avatar: 'https://klike.net/uploads/posts/2022-08/1659592369_3.jpg'},
    ]
}

const DialogsReducer = (state = initialState, action: AllActionTypes): SideBarType => {
    return state

}

export default DialogsReducer;
